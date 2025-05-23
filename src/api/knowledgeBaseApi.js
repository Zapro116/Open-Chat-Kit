export const getKnowledgeBases = async () => {
  // const payload = {
  //     team_id: "",
  //     kb_ids: [],
  //   };

  //   const response = await ingestionBaseAxios(token).post(
  //     `/kb/status`,
  //     payload,
  //     {
  //       signal: signal,
  //     }
  //   );

  const response = {
    data: {
      identifier: "2f3bd8a9-9e42-408d-924d-c1d5428e4ead",
      success: true,
      errors: null,
      data: {
        knowledge_bases: {
          personal: [
            {
              kb_id: 133,
              name: "Devops",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T16:22:57.656803Z",
              last_indexed_at: "2025-05-12T16:22:57.908417Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 1,
                type: "azure_devops",
                name: "Azure DevOps",
                image_name: "azure_devops.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 138,
              name: "Azure 2",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T16:55:39.117935Z",
              last_indexed_at: "2025-05-12T16:55:39.342820Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 1,
                type: "azure_devops",
                name: "Azure DevOps",
                image_name: "azure_devops.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 145,
              name: "Azure 3",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T17:57:53.506223Z",
              last_indexed_at: "2025-05-12T17:57:53.715882Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 1,
                type: "azure_devops",
                name: "Azure DevOps",
                image_name: "azure_devops.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 134,
              name: "Github ",
              state: "update_error",
              update_token: false,
              created_at: "2025-05-12T16:24:49.688677Z",
              last_indexed_at: "2025-05-12T16:24:49.761503Z",
              ingestion_status: "completed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 2,
                type: "github",
                name: "GitHub",
                image_name: "github.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-github-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 135,
              name: "Github Private",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T16:25:57.466418Z",
              last_indexed_at: "2025-05-12T16:25:58.514243Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 2,
                type: "github",
                name: "GitHub",
                image_name: "github.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-github-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 144,
              name: "Github 3",
              state: "update_error",
              update_token: false,
              created_at: "2025-05-12T17:55:21.769257Z",
              last_indexed_at: "2025-05-12T17:55:21.841564Z",
              ingestion_status: "completed",
              success_percentage: 100,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 2,
                type: "github",
                name: "GitHub",
                image_name: "github.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-github-to-fynix-pat-token-and-clone-url",
              },
            },
            {
              kb_id: 136,
              name: "Gitlab",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T16:27:13.400659Z",
              last_indexed_at: "2025-05-12T16:27:15.763172Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 3,
                type: "gitlab",
                name: "GitLab",
                image_name: "gitlab.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-gitlab-to-fynix-pat-token-and-clone-url-guide",
              },
            },
            {
              kb_id: 137,
              name: "Quip",
              state: "update_error",
              update_token: false,
              created_at: "2025-05-12T16:28:35.570466Z",
              last_indexed_at: "2025-05-12T16:28:36.954857Z",
              ingestion_status: "completed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 4,
                type: "quip",
                name: "Quip",
                image_name: "quip.png",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-documents/#connecting-quip-documents-to-fynix",
              },
            },
          ],
          team: [
            {
              kb_id: 138,
              name: "Azure 2",
              state: "error",
              update_token: false,
              created_at: "2025-05-12T16:55:39.117935Z",
              last_indexed_at: "2025-05-12T16:55:39.342820Z",
              ingestion_status: "failed",
              success_percentage: 0,
              is_enabled: true,
              is_creator: true,
              is_updatable: false,
              integration: {
                id: 1,
                type: "azure_devops",
                name: "Azure DevOps",
                image_name: "azure_devops.svg",
                integration_help_url:
                  "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
              },
            },
          ],
          organization: [],
        },
      },
      failed_entries: null,
      pagination: null,
    },
  };
  if (
    response.data &&
    response.data.data &&
    response.data.data.knowledge_bases
  ) {
    const { knowledge_bases } = response.data.data;
    const combinedKnowledgeBases = [
      ...(knowledge_bases.personal || {}),
      ...(knowledge_bases.team || {}),
      ...(knowledge_bases.organization || {}),
    ];
    const seenIds = new Set();
    const allKnowledgeBases = combinedKnowledgeBases.filter((kb) => {
      if (seenIds.has(kb.kb_id)) {
        return false;
      }
      seenIds.add(kb.kb_id);
      return true;
    });
    return allKnowledgeBases;
  }
  return [];
};

export const fetchKnowledgeBaseStatus = async (token, kbId, signal) => {
  try {
    if (!token) {
      console.error("No token provided to fetchKnowledgeBaseStatus");
      return null;
    }

    if (!kbId) {
      console.error("No kbId provided to fetchKnowledgeBaseStatus");
      return null;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use the ingestionBaseAxios to call the kb/status endpoint
    // const response = await ingestionBaseAxios(token).post(
    //   `/kb/status`,
    //   {
    //     team_id: "",
    //     kb_ids: [kbId],
    //   },
    //   {
    //     signal: signal,
    //   }
    // );

    const response = {
      data: {
        identifier: "7a8dfe2e-0f2f-4be4-b2b9-c22fd9d1cb83",
        success: true,
        errors: null,
        data: {
          knowledge_bases: {
            personal: [
              {
                kb_id: 133,
                name: "Devops",
                state: "update_error",
                update_token: false,
                created_at: "2025-05-12T16:22:57.656803Z",
                last_indexed_at: "2025-05-12T16:22:57.908417Z",
                ingestion_status: "failed",
                success_percentage: 0,
                is_enabled: true,
                is_creator: true,
                is_updatable: false,
                integration: {
                  id: 1,
                  type: "azure_devops",
                  name: "Azure DevOps",
                  image_name: "azure_devops.svg",
                  integration_help_url:
                    "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
                },
              },
            ],
            team: [],
            organization: [],
          },
        },
        failed_entries: null,
        pagination: null,
      },
    };

    // Process the API response
    if (
      response.data &&
      response.data.data &&
      response.data.data.knowledge_bases
    ) {
      const { knowledge_bases } = response.data.data;
      const combinedKnowledgeBases = [
        ...(knowledge_bases.personal || {}),
        ...(knowledge_bases.team || {}),
        ...(knowledge_bases.organization || {}),
      ];
      const seenIds = new Set();
      const allKnowledgeBases = combinedKnowledgeBases.filter((kb) => {
        if (seenIds.has(kb.kb_id)) {
          return false;
        }
        seenIds.add(kb.kb_id);
        return true;
      });
      return allKnowledgeBases[0] || null;
    }

    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch knowledge base status request was aborted");
    } else {
      console.error("Error fetching knowledge base status:", error);
    }
    return null;
  }
};

export const fetchTeamKnowledgeBases = async (token, teamId, signal) => {
  try {
    // Use the ingestionBaseAxios to call the kb/status endpoint
    //   const response = await ingestionBaseAxios(token).post(
    //     `/kb/status`,
    //     {
    //       team_id: teamId,
    //       kb_ids: [],
    //     },
    //     {
    //       signal: signal,
    //     }
    //   );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = {
      data: {
        identifier: "2fd540cb-ecf4-4f65-905f-350704d16f0e",
        success: true,
        errors: null,
        data: {
          knowledge_bases: {
            personal: [],
            team: [
              {
                kb_id: 138,
                name: "Azure 2",
                state: "update_error",
                update_token: false,
                created_at: "2025-05-12T16:55:39.117935Z",
                last_indexed_at: "2025-05-12T16:55:39.342820Z",
                ingestion_status: "failed",
                success_percentage: 0,
                is_enabled: true,
                is_creator: true,
                is_updatable: false,
                integration: {
                  id: 1,
                  type: "azure_devops",
                  name: "Azure DevOps",
                  image_name: "azure_devops.svg",
                  integration_help_url:
                    "https://docs.fynix.ai/fynix-code-assistant/knowledge-source/connect-repositories/#-connecting-azure-devops-to-fynix-pat-token-and-clone-url",
                },
              },
            ],
            organization: [],
          },
        },
        failed_entries: null,
        pagination: null,
      },
    };

    // Process the API response
    if (
      response.data &&
      response.data.data &&
      response.data.data.knowledge_bases
    ) {
      const { knowledge_bases } = response.data.data;
      const combinedKnowledgeBases = [
        ...(knowledge_bases.personal || {}),
        ...(knowledge_bases.team || {}),
        ...(knowledge_bases.organization || {}),
      ];
      const seenIds = new Set();
      const allKnowledgeBases = combinedKnowledgeBases.filter((kb) => {
        if (seenIds.has(kb.kb_id)) {
          return false;
        }
        seenIds.add(kb.kb_id);
        return true;
      });
      console.log("Combined knowledge bases:", allKnowledgeBases);
      return allKnowledgeBases;
    }

    console.log("No knowledge bases found in API response");
    return [];
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch team knowledge bases request was aborted");
    } else {
      console.error("Error fetching team knowledge bases:", error);
    }
    throw error;
  }
};
