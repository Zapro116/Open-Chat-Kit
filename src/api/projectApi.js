import { locksmithAxios } from "../utils/axios";

export const getProjects = async (token, signal) => {
  // const response = await locksmithAxios(token).get(`/v1.0/teams`, {
  //   signal,
  // });

  const response = {
    data: {
      identifier: "7884eada-72fd-4d66-97a7-9b45b3263920",
      success: true,
      message: null,
      errors: null,
      data: [
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
  return response;
};

export const fetchProjectsById = async (token, team_id, signal) => {
  const response = await locksmithAxios(token).get(`/v1.0/teams/${team_id}`, {
    signal,
  });

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
  const response = await locksmithAxios(token).get(
    `/v1.0/teams/${team_id}/members`
  );

  // const response = {
  //   data: {
  //     identifier: "274fd2a0-a428-4a20-b8a8-3b72111bb62e",
  //     success: true,
  //     message: null,
  //     errors: null,
  //     data: [
  //       {
  //         user_id: "user_2wAvdTcGzRYGZPsphJrTpSJfbO4",
  //         team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
  //         role_id: "1f023f96-e73e-62d4-b849-798374de4a2e",
  //         role_name: "Member",
  //         clerk_user: {
  //           firstName: "Mitanshu",
  //           lastName: "Bhatt",
  //           email: "mitanshubhatt@gofynd.com",
  //         },
  //       },
  //       {
  //         user_id: "user_2wD66rW2AmhN3RmnBgBei12129j",
  //         team_id: "1f02a611-7cfe-6dae-bdbd-2a194859d419",
  //         role_id: "1f023f96-4d4d-64d6-af4e-667101ab3f1e",
  //         role_name: "Owner",
  //         clerk_user: {
  //           firstName: "Hariom ",
  //           lastName: "Chaurasia",
  //           email: "hariomchaurasia@gofynd.com",
  //         },
  //       },
  //     ],
  //   },
  // };

  return response;
};

export const createProject = async (token, projectData, signal) => {
  try {
    const response = await locksmithAxios(token).post(
      "/v1.0/teams",
      {
        name: projectData.projectName,
        description: projectData.projectDescription || "",
      },
      {
        signal: signal,
      }
    );

    // Return the created project in our format
    return {
      id: response?.data?.data?.team_id || "", // on adding a new project getting team_id in data.data
      projectName: projectData?.projectName || "",
      projectDescription: projectData.projectDescription || "",
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Create project request was aborted");
    } else {
      console.error("Error creating project:", error);
    }
    throw error;
  }
};

export const deleteProject = async (token, team_id, signal) => {
  const response = await locksmithAxios(token).delete(
    `/v1.0/teams/${team_id}`,
    {
      signal,
    }
  );
  return response;
};

export const updateTeamMembers = async (token, team_id, params) => {
  const response = await locksmithAxios(token).patch(
    `/v1.0/teams/${team_id}/members`,
    params
  );
  return response;
};

export const addMembersToProject = async (token, team_id, params) => {
  if (!team_id) return;
  return locksmithAxios(token).post(`/v1.0/teams/${team_id}/members`, {
    members: params,
  });
};

export const deleteTeamMember = async (token, team_id, member_id) => {
  if (!team_id || !member_id) return;
  return locksmithAxios(token).delete(
    `/v1.0/teams/${team_id}/members/${member_id}`
  );
};

export const updateProject = async (token, team_id, params, signal) => {
  return locksmithAxios(token).patch(`/v1.0/teams/${team_id}`, params, {
    signal,
  });
};
