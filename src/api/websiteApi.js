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
  const response = await cerebrumAxios(token).get("/v2.0/threads", {
    params,
  });

  return response;
};

export const deleteThread = async (token, id, email, threadTitle) => {
  const response = await cerebrumAxios(token).delete(`/v1.0/threads/${id}/`, {
    data: {
      title: threadTitle ? threadTitle : "",
      user_email: email,
    },
  });
  return response;
};
