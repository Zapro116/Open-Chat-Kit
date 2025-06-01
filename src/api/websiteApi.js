import { cerebrumAxios, locksmithAxios } from "../utils/axios";

export const getModels = async (token) => {
  const response = await cerebrumAxios(token).get("v2.0/models");
  return response;
};

export const getOrgMembers = async (token, params, signal) => {
  return locksmithAxios(token).get("/v1.0/org/members", {
    params,
    signal: signal || undefined,
  });
};

export const chatASKApi = async (token, requestBody, controller) => {
  return fetch(`http://localhost:8081/v2.0/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(requestBody),
    signal: controller?.signal,
  });
};

export const fetchThreadMessagesApi = async (token, chatThreadid) => {
  const response = await cerebrumAxios(token).get(
    `/v2.0/threads/thread/${chatThreadid}/messages/`
  );
  return response;
};

export const getHistoryData = async (token, params) => {
  // const response = await cerebrumAxios(token).get("/v2.0/threads", {
  //   params,
  // });

  await new Promise((res) => setTimeout(res, 1500));

  const response = {
    data: {
      identifier: "dca0a84b-fa99-43a3-aafd-96cd62dba9e0",
      success: true,
      message: "",
      errors: null,
      data: {
        threads: [
          {
            id: 5064,
            uuid: "f3ad8310-da55-4c6d-8a15-4c42ee7d3ed3",
            title: "Code Explanation Request",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-05-12T06:26:34.272029Z",
            updated_at: "2025-05-12T06:26:50.654598Z",
            last_message_id: 22846,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 5041,
            uuid: "5fd21927-f759-4787-9ff7-5f0e2cd85a59",
            title: "Project File Overview",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-05-09T07:05:54.992668Z",
            updated_at: "2025-05-09T07:06:20.843751Z",
            last_message_id: 22796,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4996,
            uuid: "b56a0c94-360e-4fd4-a33e-218b0b4924c0",
            title: "React Memory Game Creation",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-05-07T07:22:31.217047Z",
            updated_at: "2025-05-07T07:22:36.020427Z",
            last_message_id: 22618,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4967,
            uuid: "6cbf6f03-20fb-4bb0-b98f-a5ca6bd29fe6",
            title: '\\\n\n question_meta:{"ref...',
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-05-02T15:43:46.682778Z",
            updated_at: "2025-05-02T15:43:46.712832Z",
            last_message_id: 22506,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4897,
            uuid: "b06a8ef3-1fa2-4590-a65c-66cdd498ce23",
            title: "Location-Based Reminder App",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-29T09:06:05.919281Z",
            updated_at: "2025-04-29T09:06:18.530927Z",
            last_message_id: 22242,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4894,
            uuid: "584fe021-aae8-4189-bfe7-3114abf5343a",
            title: "Library Database Schema Design",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-29T06:38:32.219950Z",
            updated_at: "2025-04-29T06:38:39.097094Z",
            last_message_id: 22232,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4885,
            uuid: "45bd7508-1d43-4abb-9d7d-88e610dace12",
            title: "Merge Sort Multilingual",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-28T13:12:08.939283Z",
            updated_at: "2025-04-29T06:44:21.326135Z",
            last_message_id: 22234,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4880,
            uuid: "1e4ced1a-f264-4bd6-bbc7-44a8c369bdfb",
            title: "Sudoku Solver Implementation",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-28T09:50:45.724064Z",
            updated_at: "2025-04-28T09:50:59.132676Z",
            last_message_id: 22196,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4877,
            uuid: "35a9a0e7-e867-4afb-96be-3418a1e6c9a1",
            title: "Task Management Explanation",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-28T09:38:58.233145Z",
            updated_at: "2025-04-28T09:42:42.924002Z",
            last_message_id: 22194,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
          {
            id: 4875,
            uuid: "d925a953-eae8-4ef3-b85a-5d6100bf42d1",
            title: "React Memory Game Creation",
            product: "devas",
            user_email: "hariomchaurasia@gofynd.com",
            user_id: null,
            alternate_id: null,
            created_at: "2025-04-28T09:28:06.451636Z",
            updated_at: "2025-04-28T09:28:21.384783Z",
            last_message_id: 22174,
            is_deleted: false,
            meta: {},
            org_id: null,
          },
        ],
        pagination: {
          total_count: 58,
          total_pages: 6,
          current_page: 1,
          page_size: 10,
          has_next: true,
          has_previous: false,
        },
      },
      code: 200,
    },
  };
  return response;
};
