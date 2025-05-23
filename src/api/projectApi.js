import axios from "../utils/axios";

export const fetchProjectsById = async (token, project_id, signal) => {
  //   const response = await axios.get(`${API_ENDPOINTS.PROJECTS}/${project_id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     signal,
  //   });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = {
    data: {
      identifier: "6729ac3f-4180-4163-a0ca-07d78477e2f1",
      success: true,
      message: null,
      errors: null,
      data: {
        team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
        name: "Testing 00",
        description: null,
        team_slug: "testing-00-1f02a611",
        created_by: "user_2wD66rW2AmhN3RmnBgBei12129j",
        user_role: {
          role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
          role_slug: "owner",
          role_name: "Owner",
        },
      },
    },
  };

  if (response.data && response.data.data) {
    return {
      id: response.data.data.team_id,
      projectName: response.data.data.name,
      projectDescription: response.data.data.description || "",
      role: response.data.data.user_role?.role_slug,
    };
  }

  return null;
};

export const getTeamMembers = async (token, team_id) => {
  //   if (!team_id) return;
  //   return axios.get(`/teams/${team_id}/members`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = {
    data: {
      identifier: "274fd2a0-a428-4a20-b8a8-3b72111bb62e",
      success: true,
      message: null,
      errors: null,
      data: [
        {
          user_id: "user_2wAvdTcGzRYGZPsphJrTpSJfbO4",
          team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
          role_id: "1f023f96-e73e-62d4-b849-798374de4a2e",
          role_name: "Member",
          clerk_user: {
            firstName: "Mitanshu",
            lastName: "Bhatt",
            email: "mitanshubhatt@gofynd.com",
          },
        },
        {
          user_id: "user_2wD66rW2AmhN3RmnBgBei12129j",
          team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
          role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
          role_name: "Owner",
          clerk_user: {
            firstName: "Hariom ",
            lastName: "Chaurasia",
            email: "hariomchaurasia@gofynd.com",
          },
        },
      ],
    },
  };

  return response;
};
