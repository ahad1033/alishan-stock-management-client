import { baseApi } from "@/redux/api/base-api";

import { API_ENDPOINTS } from "@/utils/api-endpoints";

// ----------------------------------------------------------------------

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: API_ENDPOINTS.GET_ALL_USER,
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_USER,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USERS"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.GET_USER_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    resetUser: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.RESET_USER,
        method: "GET",
        body: data,
      }),
      providesTags: ["USERS"],
    }),
  }),
});

export const {
  useResetUserQuery,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
} = userApi;
