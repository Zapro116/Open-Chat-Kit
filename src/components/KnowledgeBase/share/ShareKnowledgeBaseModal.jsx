import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Text, Tabs, Checkbox } from "@mantine/core";
import { useAuth } from "@clerk/clerk-react";
// import { shareKnowledgeBaseAcrossOrg } from "../../../api/knowledgeBaseApi";

// Import the tab components
import ProjectsTab from "./ProjectsTab";
import MembersTab from "./MembersTab";
import ModalFooter from "./ModalFooter";
// import { lockSmithBaseAxios } from "../../../../utils/axios";

/**
 * Modal component for sharing a knowledge base with projects or team members
 * @param {Object} props - Component props
 * @param {boolean} props.opened - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.knowledgeBase - The knowledge base to share
 */
export const ShareKnowledgeBaseModal = ({ opened, onClose, knowledgeBase }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState("projects");

  // Projects tab state
  const [projects, setProjects] = useState([]);
  const [initialSelectedProjects, setInitialSelectedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(null);
  const [projectSearchQuery, setProjectSearchQuery] = useState("");

  // Team members tab state
  const [members, setMembers] = useState([]);
  const [initialSelectedMembers, setInitialSelectedMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [noMembersFound, setNoMembersFound] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [finalShareList, setFinalShareList] = useState({
    kb_ids: [],
    team_id: [],
    user_id: [],
    org_id: [""],
  });

  const [orgState, setOrgState] = useState({});

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Refs
  const { getToken } = useAuth();
  const abortControllerRef = useRef(null);
  // Load all data when the modal opens, not when tabs change
  useEffect(() => {
    const loadInitialData = async () => {
      if (opened) {
        setProjectsLoading(true);
        setMembersLoading(true);
        // Load members data - using a local function to avoid dependency issues
        const loadInitialList = async () => {
          // const intialShareList = {
          //     "org": {
          //       "org_id": "org_2wM6P0x3exs5fK4VVX4VY2EtqYA",
          //       "has_access": false
          //     }
          //   }
          // };
          const token = await getToken({ template: "neon2" });

          // Fetch shared access details from the API
          const response = await lockSmithBaseAxios(token).get(
            `/datasources/has-and-hasnot/access/${knowledgeBase.kb_id}`
          );

          const intialShareList = response.data;
          console.log(intialShareList);
          if (intialShareList?.data?.teams) {
            setProjects(intialShareList?.data?.teams);
            setInitialSelectedProjects(intialShareList?.data?.teams);

            // Add team_ids with has_access to finalShareList
            const teamsWithAccess = intialShareList.data.teams
              .filter((team) => team.has_access)
              .map((team) => team.team_id);

            setFinalShareList((prevState) => ({
              ...prevState,
              team_id: teamsWithAccess,
            }));
          } else {
            setProjectsError("Failed to load projects");
          }
          if (intialShareList?.data?.users) {
            if (intialShareList?.data?.users.length) {
              setMembers(intialShareList?.data?.users);
              setInitialSelectedMembers(intialShareList?.data?.users);

              // Add user_ids with has_access to finalShareList
              const usersWithAccess = intialShareList.data.users
                .filter((user) => user.has_access)
                .map((user) => user.user_id);

              setFinalShareList((prevState) => ({
                ...prevState,
                user_id: usersWithAccess,
              }));
            } else {
              setNoMembersFound(true);
            }
          } else {
            setMembersError("Failed to load members");
          }
          if (intialShareList?.data?.org) {
            setOrgState(intialShareList?.data?.org || {});
            if (intialShareList?.data?.org?.has_access) {
              setFinalShareList((prevState) => ({
                ...prevState,
                org_id: [intialShareList?.data?.org?.org_id],
              }));
            }
          }
          // Add knowledge base ID to finalShareList
          setFinalShareList((prevState) => ({
            ...prevState,
            kb_ids: knowledgeBase?.kb_id ? [knowledgeBase.kb_id] : [],
          }));
          setProjectsLoading(false);
          setMembersLoading(false);
        };
        try {
          await loadInitialList();
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Error fetching initial list:", error);
          }
          setProjectsLoading(false);
          setMembersLoading(false);
        }
      } else {
        setProjects([]);
        setInitialSelectedProjects([]);
        setMembers([]);
        setInitialSelectedMembers([]);
      }
    };
    // loadInitialData();
  }, [opened, getToken]);

  // Clean up abort controller when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Toggle member selection
  const toggleMemberSelection = (member) => {
    setFinalShareList((prevState) => ({
      ...prevState,
      user_id: prevState.user_id.includes(member.user_id)
        ? prevState.user_id.filter((id) => id !== member.user_id)
        : [...prevState.user_id, member.user_id],
    }));
  };

  // Toggle project selection
  const toggleProjectSelection = (project) => {
    setFinalShareList((prevState) => ({
      ...prevState,
      team_id: prevState.team_id.includes(project.team_id)
        ? prevState.team_id.filter((id) => id !== project.team_id)
        : [...prevState.team_id, project.team_id],
    }));
  };

  // Note: Project filtering is now handled in the ProjectsTab component

  // Handle share button click
  const handleShare = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const { token } = await getToken({ template: "neon2" });

      // Create a new AbortController for this request
      // if (abortControllerRef.current) {
      //   abortControllerRef.current.abort();
      // }
      // abortControllerRef.current = new AbortController();

      // // Check if knowledgeBase and kb_id exist
      // if (!knowledgeBase || !knowledgeBase.kb_id) {
      //   throw new Error("Knowledge base ID is missing");
      // }

      // // Show loading state for a minimum of 1.5 seconds to provide visual feedback
      // const startTime = Date.now();
      // // Call the API to share the knowledge base with projects
      // const response = await shareKnowledgeBaseAcrossOrg(
      //   token,
      //   finalShareList,
      //   abortControllerRef.current.signal
      // );

      // // Ensure the loading state is shown for at least 1.5 seconds
      // const elapsedTime = Date.now() - startTime;

      // if (response?.data?.success) {
      //   if (elapsedTime < 1500) {
      //     await new Promise((resolve) =>
      //       setTimeout(resolve, 1500 - elapsedTime)
      //     );
      //   }

      //   // Close the modal on success
      //   onClose();
      // } else {
      //   setSubmitError(response?.data?.message || "Permission denied");
      // }
    } catch (error) {
      if (error.name !== "AbortError" && error.name !== "CanceledError") {
        console.error("Error sharing knowledge base:", error);
        setSubmitError("Failed to share knowledge base. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Share Knowledge Base"
      size="md"
      centered
      classNames={{
        header: "bg-bgCardColor border-b border-borderDefault",
        title: "text-textDefault font-medium",
        body: "bg-bgBodyColor p-0",
        close: "text-textDefault hover:bg-bgSelectedColor rounded-full",
      }}
    >
      <div className="p-4 flex flex-col gap-4">
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          color="var(--text-purple-color)"
        >
          <Tabs.List className="border-b border-borderDefault">
            <Tabs.Tab value="projects">Projects</Tabs.Tab>
            <Tabs.Tab value="members">Members</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="projects">
            <ProjectsTab
              projects={projects}
              finalShareList={finalShareList}
              projectsLoading={projectsLoading}
              projectsError={projectsError}
              projectSearchQuery={projectSearchQuery}
              setProjectSearchQuery={setProjectSearchQuery}
              toggleProjectSelection={toggleProjectSelection}
            />
          </Tabs.Panel>

          <Tabs.Panel value="members">
            <MembersTab
              members={members}
              finalShareList={finalShareList}
              membersLoading={membersLoading}
              noMembersFound={noMembersFound}
              memberSearchQuery={memberSearchQuery}
              handleMemberSearch={(e) => setMemberSearchQuery(e.target.value)}
              toggleMemberSelection={toggleMemberSelection}
            />
          </Tabs.Panel>
        </Tabs>

        {submitError && (
          <Text size="sm" className="text-textDangerColor">
            {submitError}
          </Text>
        )}

        <div className="flex items-center my-2">
          <Checkbox
            defaultChecked={orgState?.has_access}
            onChange={() => {
              setFinalShareList((prevState) => ({
                ...prevState,
                org_id:
                  prevState?.org_id?.[0]?.length > 0 ? [] : [orgState?.org_id],
              }));
            }}
            label="Share across organization"
            color="var(--text-purple-color)"
            styles={{
              input: {
                cursor: "pointer",
                "&:checked": {
                  backgroundColor: "var(--text-purple-color)",
                  borderColor: "var(--text-purple-color)",
                },
              },
              icon: { color: "white" },
            }}
          />
        </div>

        <ModalFooter
          activeTab={activeTab}
          finalShareList={finalShareList}
          orgState={orgState}
          submitting={submitting}
          onClose={onClose}
          handleShare={handleShare}
          onReset={(tab) => {
            if (tab === "projects") {
              setProjects([...initialSelectedProjects]);
            } else {
              setMembers([...initialSelectedMembers]);
            }
          }}
        />
      </div>
    </Modal>
  );
};
