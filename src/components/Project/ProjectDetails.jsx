import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  IconArrowLeft,
  IconDatabase,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectMembers } from "./ProjectMembers";
import { fetchProjectsById, getTeamMembers } from "../../api/projectApi";
import Navbar from "../Navbar/Navbar";
import { fetchTeamKnowledgeBases } from "../../api/knowledgeBaseApi";
import { Loader } from "@mantine/core";
import { ProjectDetailCard } from "./ProjectDetailCard";
import useModalStore from "../../store/modalStore";
import AddKnowledgeModal from "../KnowledgeBase/AddKnowledgeModal";
import ContextModal from "../ContextModal/ContextModal";
import { MultiSelectKnowledgeModal } from "../KnowledgeBase/MultiSelectKnowledgeModal";
import { HOME_ROUTE } from "../../utils/apiEndpoints";
import AddProjectMember from "./AddProjectMember";
import { DEFAULT_CLERK_TEMPLATE } from "../../utils/contants";

const OWNER_SLUG = "owner";

function ProjectDetails() {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [members, setMembers] = useState([]);
  const [teamMembersLoading, setTeamMembersLoading] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [knowledgeBasesLoading, setKnowledgeBasesLoading] = useState(false);
  const [deletingKbId, setDeletingKbId] = useState(null);
  const [refreshKnowledgeBases, setRefreshKnowledgeBases] = useState(false);

  const { openModal, setShowExistingKbInContextModal, closeModal, modals } =
    useModalStore();

  //   const [isEditing, setIsEditing] = useState(false);

  const abortControllerRef = useRef(null);

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const loadTeamMembers = async (token) => {
    if (!token) {
      token = await getToken({
        template: "neon2",
      });
    }
    let membersData;
    try {
      setTeamMembersLoading(true);
      const members = await getTeamMembers(token, project_id);

      membersData = members.data?.data?.map((member) => ({
        role: member.role_name,
        firstName: member.clerk_user.firstName,
        lastName: member.clerk_user.lastName,
        id: member.user_id,
      }));
      setMembers(membersData);
    } catch (err) {
      console.log(err);
      membersData = [];
    } finally {
      setTeamMembersLoading(false);
    }
    return membersData;
  };

  const loadProject = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      // Get the authentication token
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });

      // Use the API function to fetch projects
      let projectData = await fetchProjectsById(
        token,
        project_id,
        abortControllerRef.current.signal
      );

      const membersData = await loadTeamMembers(token);

      if (projectData) {
        setProject(projectData);

        setMembers(membersData ?? []);
      } else {
        setError("Project not found");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [project_id]);

  useEffect(() => {
    loadProject();
  }, []);

  const handleBackClick = () => {
    navigate(HOME_ROUTE);
  };

  const handleOpenExistingKnowledgeModal = () => {
    openModal("multiSelectKnowledgeModal");
  };

  const handleAddKnowledgeSource = () => {
    // navigate(`/${KNOWLEDGE_BASE_ROUTE}`);
    setShowExistingKbInContextModal(false);
    openModal("contextModal");
  };

  const loadKnowledgeBases = useCallback(async () => {
    if (!project || !project.id) {
      return;
    }

    try {
      setKnowledgeBasesLoading(true);

      // Create a new AbortController for this request
      const knowledgeBaseAbortController = new AbortController();

      // Get the authentication token
      const token = await getToken({
        template: "neon2",
      });

      // Use the API function to fetch knowledge bases for this team/project
      const kbList = await fetchTeamKnowledgeBases(
        token,
        project.id,
        knowledgeBaseAbortController.signal
      );

      console.log({ kbList });

      setKnowledgeBases(kbList);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching knowledge bases:", error);
      }
    } finally {
      setKnowledgeBasesLoading(false);
    }
  }, [project, getToken]);

  useEffect(() => {
    if (project) {
      loadKnowledgeBases();
    }
  }, [project, loadKnowledgeBases]);

  const handleDeleteKnowledgeBase = useCallback(
    async (knowledgeBase, projectId) => {
      if (!knowledgeBase || !knowledgeBase.kb_id) {
        console.error("Invalid knowledge base or missing kb_id");
        return;
      }

      if (!projectId) {
        console.error("Missing projectId for knowledge base revocation");
        return;
      }

      try {
        // Set the deleting state to show loading indicator
        setDeletingKbId(knowledgeBase.kb_id);

        // Create a new AbortController for this request
        const abortController = new AbortController();

        // Get the authentication token
        const token = await getToken({
          template: "neon2",
        });

        console.log(
          `Revoking knowledge base: ${knowledgeBase.name} (${knowledgeBase.kb_id})`
        );

        // Call the API to revoke the knowledge base
        await revokeKnowledgeBase(
          token?.token ?? token,
          {
            kb_ids: [knowledgeBase.kb_id],
            team_id: [projectId],
            user_id: [],
            org_id: [],
          },
          abortController.signal
        );

        console.log(
          `Knowledge base ${knowledgeBase.kb_id} revoked successfully`
        );

        // Update the UI by removing the deleted knowledge base from the list
        setKnowledgeBases((prevKnowledgeBases) =>
          prevKnowledgeBases.filter((kb) => kb.kb_id !== knowledgeBase.kb_id)
        );

        // Update the knowledge base list in the left side tab
        if (
          refreshKnowledgeBases &&
          typeof refreshKnowledgeBases === "function"
        ) {
          console.log(
            "Calling refreshKnowledgeBases after deletion from project page"
          );
          refreshKnowledgeBases();
        }
      } catch (error) {
        console.error("Error revoking knowledge base:", error);

        // Optionally, you could show an error notification here
      } finally {
        // Clear the deleting state
        setDeletingKbId(null);
      }
    },
    [getToken, refreshKnowledgeBases, project?.id]
  );

  return (
    <div className="w-full relative bg-bgCardColor">
      <Navbar />
      <div className="container mx-auto px-4 py-4  project-details">
        {/* Header with project name and add button */}
        <div className="flex justify-between items-center mb-6 mt-[72px]">
          <div className="flex items-center justify-start">
            <button
              className="text-textDefault mr-2 hover:bg-bgSelectedColor p-1 rounded"
              onClick={handleBackClick}
            >
              <IconArrowLeft size={20} />
            </button>
            <h3 className="text-xl font-semibold text-textDefault">
              {project?.projectName ?? "Loading..."}
            </h3>
            {project?.projectName && (
              <button
                className="text-textDefault ml-2 hover:bg-bgSelectedColor p-1 rounded"
                onClick={() => setEditModalOpened(true)}
                title="Edit Project"
              >
                <IconPencil size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button
              className="flex items-center text-textPurple px-4 py-2 rounded hover:bg-bgSelectedColor transition-transform"
              onClick={handleOpenExistingKnowledgeModal}
            >
              <IconDatabase
                size={16}
                className="mr-2"
                title="Use Existing Knowledge Bases"
              />
              Use Existing
            </button>
            <button
              className="flex items-center text-textPurple px-4 py-2 rounded hover:bg-bgSelectedColor transition-transform"
              onClick={handleAddKnowledgeSource}
            >
              <IconPlus
                size={16}
                className="mr-2"
                title="Add Knowledge Source"
              />
              Add New
            </button>
          </div>
        </div>

        {/* Main content in a grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ height: "calc(100vh - 180px)" }}
        >
          {/* Left side - Knowledge Sources */}
          <div className="border border-solid border-borderDefault rounded-md p-4 flex flex-col h-full overflow-hidden">
            <h4 className="text-lg font-medium mb-4 text-textDefault">
              Knowledge Sources
            </h4>

            {knowledgeBasesLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader size="md" color="var(--text-purple-color)" />
              </div>
            ) : knowledgeBases.length > 0 ? (
              <div
                className="knowledge-bases-list space-y-4 overflow-y-auto flex-grow pr-2"
                style={{
                  maxHeight: "calc(100% - 40px)",
                  scrollbarWidth: "thin",
                }}
              >
                {knowledgeBases.map((kb) => (
                  <ProjectDetailCard
                    key={kb.kb_id}
                    knowledgeBase={kb}
                    onDelete={handleDeleteKnowledgeBase}
                    deletingKbId={deletingKbId}
                    projectId={project.id}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-textDimmedColor">
                No knowledge sources have been added to this project yet. Click
                the "Add New" or "Use Existing" button to get started.
              </p>
            )}
          </div>

          {/* Right side - Project Members */}
          <ProjectMembers
            key={project?.id}
            members={members}
            isOwner={project?.role === OWNER_SLUG}
            setMembers={setMembers}
            loadTeamMembers={loadTeamMembers}
            teamMembersLoading={teamMembersLoading}
          />
        </div>
      </div>
      <AddKnowledgeModal />
      <ContextModal />
      <MultiSelectKnowledgeModal
        teamId={project?.id}
        opened={modals?.multiSelectKnowledgeModal}
        onClose={() => closeModal("multiSelectKnowledgeModal")}
        onSubmit={() => {}}
      />
      <AddProjectMember loadTeamMembers={loadTeamMembers} />
    </div>
  );
}

export default ProjectDetails;
