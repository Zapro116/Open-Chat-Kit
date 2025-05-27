import axios from "axios";

// Create an Axios instance
const cerebrumAxios = (token) =>
  axios.create({
    baseURL: "http://localhost:8081/", // Replace with your API's base URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

// Request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     // Add authorization token to headers
//     // const token = localStorage.getItem('token'); // Or get the token from your state management
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     // You can modify the request config here (e.g., add headers, transform request data)
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     // You can transform response data here
//     return response;
//   },
//   (error) => {
//     // Handle response error
//     // For example, redirect to login page if 401 Unauthorized
//     if (error.response && error.response.status === 401) {
//       // window.location.href = '/login'; // Or use your router to navigate
//     }
//     return Promise.reject(error);
//   }
// );

export { cerebrumAxios };
