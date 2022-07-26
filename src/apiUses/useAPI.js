import { api } from "../boot/axios.js";

export default function useAPI(url) {
  const list = async () => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const getById = async (id) => {
    try {
      const response = await api.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const post = async (data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const put = async (data) => {
    try {
      const response = await api.put(`${url}/${data.id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const del = async (id) => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    list,
    getById,
    post,
    put,
    del,
  };
}
