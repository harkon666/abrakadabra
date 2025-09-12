import { BASE_URL } from "@/config/base-url";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiForm = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiForm.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiForm.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized access");
          break;
        case 403:
          console.log("Forbidden access");
          break;
        case 404:
          console.log("Resource not found");
          break;
        case 500:
          console.log(
            "xxxx =================  Internal server error ============= xxxx"
          );
          break;
        default:
          console.log("Unknown error occurred");
      }
    } else if (error.request) {
      console.log("Network error occurred");
    } else {
      console.log("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized access");
          break;
        case 403:
          console.log("Forbidden access");
          break;
        case 404:
          console.log("Resource not found");
          break;
        case 500:
          console.log(
            "xxxx =================  Internal server error ============= xxxx"
          );
          break;
        default:
          console.log("Unknown error occurred");
      }
    } else if (error.request) {
      console.log("Network error occurred");
    } else {
      console.log("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);
