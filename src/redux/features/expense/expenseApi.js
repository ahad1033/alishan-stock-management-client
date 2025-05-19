import { baseApi } from "@/redux/api/base-api";

import { API_ENDPOINTS } from "@/utils/api-endpoints";

// ----------------------------------------------------------------------

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: () => ({
        url: API_ENDPOINTS.GET_ALL_EXPENSE,
        method: "GET",
      }),
      providesTags: ["EXPENSES"],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.CREATE_EXPENSE,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EXPENSES"],
    }),
    getExpenseById: builder.query({
      query: (id) => ({
        url: API_ENDPOINTS.GET_EXPENSE_BY_ID(id),
        method: "GET",
      }),
      providesTags: ["EXPENSES"],
    }),
    updateExpense: builder.mutation({
      query: ({ data, productId }) => ({
        url: API_ENDPOINTS.UPDATE_EXPENSE_BY_ID(productId),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EXPENSES"],
    }),
    deleteExpense: builder.mutation({
      query: (productId) => ({
        url: API_ENDPOINTS.DELETE_EXPENSE_BY_ID(productId),
        method: "DELETE",
      }),
      invalidatesTags: ["EXPENSES"],
    }),
  }),
});

export const {
  useGetAllExpenseQuery,
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useCreateExpenseMutation,
} = expenseApi;
