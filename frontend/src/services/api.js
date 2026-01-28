import axios from "axios";

export const fetchInsights = (filters) => {
  return axios.get("http://localhost:5000/api/insights", {
    params: filters
  });
};
