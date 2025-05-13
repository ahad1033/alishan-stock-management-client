import { baseApi } from "@/redux/api/base-api";

import { API_ENDPOINTS } from "@/utils/api-endpoints";

// ----------------------------------------------------------------------

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomer: builder.query({
      query: () => ({
        url: API_ENDPOINTS.GET_ALL_CUSTOMER,
        method: "GET",
      }),
      providesTags: ["CUSTOMERS"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_CUSTOMER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.GET_CUSTOMER_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["CUSTOMERS"],
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
} = customerApi;
