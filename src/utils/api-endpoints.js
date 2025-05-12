// ------------------------------------------------------------

export const API_BASE_URL = "http://localhost:5000/api/v1";

export const API_ENDPOINTS = {
  //  AUTH APIS
  LOGIN: `/auth/login`,
  CHANGE_PASSWORD: `/auth/change-password`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,

  // USERS APIS
  CREATE_USER: `/users/create-user`,
  GET_ALL_USER: `/users/get-all-user`,
  GET_USER_BY_ID: (id) => `/users/get-single-user/${id}`,
  UPDATE_USER_BY_ID: (id) => `${API_BASE_URL}/users/update-user/${id}`,
  DELETE_USER_BY_ID: (id) => `${API_BASE_URL}/users/delete-user/${id}`,
  
  //
  //
};
