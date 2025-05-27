import { cerebrumAxios } from "../utils/axios";

export const getModels = async (token) => {
  const response = await cerebrumAxios(token).get("v2.0/surface/1/models");
  return response;
};
