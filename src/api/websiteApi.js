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
