import { cerebrumAxios } from "../utils/axios";
import { baseCerebrumUrl } from "../utils/contants";

export const getModels = async (token) => {
  const response = await cerebrumAxios(token).get("v2.0/models");
  return response;
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
