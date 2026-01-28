import axios from "axios";

export const fetchInsights = (filters) => {
  return axios.get("http://localhost:2000/api/insights", {
    params: filters
  });
};
