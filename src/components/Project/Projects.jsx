import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { IconFolder } from "@tabler/icons-react";
import { DEFAULT_CLERK_TEMPLATE, PROJECT_ROUTE } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  getProjects,
  deleteProject as apiDeleteProject,
} from "../../api/projectApi";
import DeleteProjectModal from "./DeleteProjectModal";
import EditProjectModal from "./EditProjectModal";
import { notifications } from "@mantine/notifications";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const [deleteProject, setDeleteProject] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });
      const response = await getProjects(token);
      setProjects(response.data?.data ?? []);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading projects, Please try again later</div>;
  }

  const handleDeleteProject = async () => {
    try {
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });
      const response = await apiDeleteProject(token, deleteProject.team_id);
      if (response.data.status === "success") {
        fetchProjects();
      }
      setDeleteProject(null);
      notifications.show({
        title: `${deleteProject.name} deleted`,
        message: "Deletion successful",
        color: "green",
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
      notifications.show({
        title: "Error deleting project",
        message: "Deletion failed",
        color: "red",
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col w-full cursor-default max-h-[200px] overflow-y-auto">
      {projects.length > 0 ? (
        projects?.map((project) => (
          <ListItem
            key={project.team_id}
            name={project.name}
            icon={<IconFolder size={20} />}
            onClick={() => {
              navigate(`/${PROJECT_ROUTE}/${project.team_id}`);
            }}
            knowledge={project}
            onEdit={(project) => {
              setEditProject(project);
            }}
            onDelete={() => {
              setDeleteProject(project);
            }}
          />
        ))
      ) : (
        <div className="flex justify-center items-center text-xs h-full">
          <p>No projects found</p>
        </div>
      )}
      {deleteProject && (
        <DeleteProjectModal
          opened={deleteProject}
          setOpened={setDeleteProject}
          project={deleteProject}
          onDelete={handleDeleteProject}
        />
      )}
      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => {
            setEditProject(null);
          }}
          onEditSubmit={() => {
            fetchProjects();
            setEditProject(null);
          }}
        />
      )}
    </div>
  );
}

export default Projects;
