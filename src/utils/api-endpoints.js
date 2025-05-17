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

  // PRODUCTS APIS
  CREATE_PRODUCT: `/products/create-product`,
  GET_ALL_PRODUCT: `/products/get-all-product`,
  GET_PRODUCT_BY_ID: (id) => `/products/get-single-product/${id}`,
  UPDATE_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/edit-product/${id}`,
  DELETE_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/delete-product/${id}`,

  // CUSTOMERS APIS
  CREATE_CUSTOMER: `/customers/create-customer`,
  GET_ALL_CUSTOMER: `/customers/get-all-customer`,
  GET_CUSTOMER_BY_ID: (id) => `/customers/get-single-customer/${id}`,
  UPDATE_CUSTOMER_BY_ID: (id) =>
    `${API_BASE_URL}/customers/edit-customer/${id}`,
  DELETE_CUSTOMER_BY_ID: (id) =>
    `${API_BASE_URL}/customers/delete-customer/${id}`,

  // EMPLOYEE APIS
  CREATE_EMPLOYEE: `/employees/create-employee`,
  GET_ALL_EMPLOYEE: `/employees/get-all-employee`,
  GET_EMPLOYEE_BY_ID: (id) => `/employees/get-single-employee/${id}`,
  UPDATE_EMPLOYEE_BY_ID: (id) =>
    `${API_BASE_URL}/employees/edit-employee/${id}`,
  DELETE_EMPLOYEE_BY_ID: (id) =>
    `${API_BASE_URL}/employees/delete-employee/${id}`,

  // INVOICE APIS
  CREATE_INVOICE: `/invoices/create-invoice`,
  GET_ALL_INVOICE: `/invoices/get-all-invoice`,
  GET_INVOICE_BY_ID: (id) => `/invoices/get-single-invoice/${id}`,
  UPDATE_INVOICE_BY_ID: (id) => `${API_BASE_URL}/invoices/edit-invoice/${id}`,
  DELETE_INVOICE_BY_ID: (id) => `${API_BASE_URL}/invoices/delete-invoice/${id}`,

  //
  //
};
