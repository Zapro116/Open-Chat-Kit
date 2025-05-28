import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { IconFolder } from "@tabler/icons-react";
import { PROJECT_ROUTE } from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  getProjects,
  deleteProject as apiDeleteProject,
} from "../../api/projectApi";
import DeleteProjectModal from "./DeleteProjectModal";
import { notifications } from "@mantine/notifications";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const [deleteProject, setDeleteProject] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const token = await getToken({
        template: "neon2",
      });
      const response = await getProjects(token);
      console.log({ response });

      //   data: {
      //     identifier: "c295d657-388b-425c-a426-281fc7a16c91",
      //     success: true,
      //     message: null,
      //     errors: null,
      //     data: [
      //       {
      //         team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
      //         org_id: "org_2wM6P0x3exs5fK4VVX4VY2EtqYA",
      //         team_slug: "testing-00-1f02a611",
      //         description: null,
      //         name: "Testing 00",
      //         created_by: "user_2wD66rW2AmhN3RmnBgBei12129j",
      //         user_role: {
      //           role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
      //           role_name: "Owner",
      //           role_slug: "owner",
      //         },
      //       },
      //       {
      //         team_id: "1f0299e9-4c52-6930-9d19-0a3b3b00f6f3",
      //         org_id: "org_2wM6P0x3exs5fK4VVX4VY2EtqYA",
      //         team_slug: "hariom-test-1f0299e9",
      //         description: null,
      //         name: "hariom test",
      //         created_by: "user_2wD66rW2AmhN3RmnBgBei12129j",
      //         user_role: {
      //           role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
      //           role_name: "Owner",
      //           role_slug: "owner",
      //         },
      //       },
      //     ],
      //   },
      // };
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
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteProject = async () => {
    try {
      const token = await getToken({
        template: "neon2",
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
            onEdit={(project) => {
              console.log("edit", project);
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
    </div>
  );
}

export default Projects;
