import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.apiUrl,
});
export { apiService };
