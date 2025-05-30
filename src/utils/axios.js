import axios from "axios";
import {
  CEREBRUM_BASE_URL,
  LOCKSMITH_BASE_URL,
  WAYNE_BASE_URL,
} from "./contants";

// Create an Axios instance
const cerebrumAxios = (token) =>
  axios.create({
    baseURL: CEREBRUM_BASE_URL, // Replace with your API's base URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

const locksmithAxios = (token) =>
  axios.create({
    baseURL: LOCKSMITH_BASE_URL, // Replace with your API's base URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const wayneAxios = (token) =>
  axios.create({
    baseURL: WAYNE_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
