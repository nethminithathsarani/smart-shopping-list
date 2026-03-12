// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});





export const getItems = (userId) => API.get(`/items/user/${userId}`);
export const addItem = (userId, item) => API.post(`/items/user/${userId}`, item);
export const updateItem = (userId, itemId, item) =>
  API.put(`/items/user/${userId}/item/${itemId}`, item);
export const deleteItem = (userId, itemId) =>
  API.delete(`/items/user/${userId}/item/${itemId}`);

export default API;
