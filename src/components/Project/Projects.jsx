import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { IconFolder } from "@tabler/icons-react";
import { PROJECT_ROUTE } from "../../utils/contants";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      //   const response = await axios.get(API_ENDPOINTS.PROJECTS);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = {
        data: {
          identifier: "c295d657-388b-425c-a426-281fc7a16c91",
          success: true,
          message: null,
          errors: null,
          data: [
            {
              team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
              org_id: "org_2wM6P0x3exs5fK4VVX4VY2EtqYA",
              team_slug: "testing-00-1f02a611",
              description: null,
              name: "Testing 00",
              created_by: "user_2wD66rW2AmhN3RmnBgBei12129j",
              user_role: {
                role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
                role_name: "Owner",
                role_slug: "owner",
              },
            },
            {
              team_id: "1f0299e9-4c52-6930-9d19-0a3b3b00f6f3",
              org_id: "org_2wM6P0x3exs5fK4VVX4VY2EtqYA",
              team_slug: "hariom-test-1f0299e9",
              description: null,
              name: "hariom test",
              created_by: "user_2wD66rW2AmhN3RmnBgBei12129j",
              user_role: {
                role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
                role_name: "Owner",
                role_slug: "owner",
              },
            },
          ],
        },
      };
      setProjects(response.data.data);
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

  return (
    <div className="flex flex-col w-full cursor-default max-h-[200px] overflow-y-auto">
      {projects?.map((project) => (
        <ListItem
          key={project.team_id}
          name={project.name}
          icon={<IconFolder size={20} />}
          onClick={() => {
            navigate(`/${PROJECT_ROUTE}/${project.team_id}`);
          }}
        />
      ))}
    </div>
  );
}

export default Projects;
