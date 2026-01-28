import axios from "axios";

export const fetchInsights = (filters) => {
  return axios.get("https://blackcoffer-backend-9ea0.onrender.com/api/insights", {
    params: filters
  });
};
