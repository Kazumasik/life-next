import { apiService } from "../interceptors";

export const createPeople = async (payload) => {
  return await apiService.post(`/people/`, payload);
};

export const getPeople = async () => {
  return await apiService.get(`/people/`);
};

export const getPeopleById = async (id) => {
  return await apiService.get(`/people/${id}`);
};
