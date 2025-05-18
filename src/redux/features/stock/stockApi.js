import { baseApi } from "@/redux/api/base-api";

import { API_ENDPOINTS } from "@/utils/api-endpoints";

// ----------------------------------------------------------------------

const stockApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStockHistory: builder.query({
      query: () => ({
        url: API_ENDPOINTS.GET_ALL_STOCK_HISTORY,
        method: "GET",
      }),
      providesTags: ["STOCKS"],
    }),
    addStock: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.ADD_STOCK,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STOCKS", "PRODUCTS"],
    }),
    deductStock: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.DEDUCT_STOCK,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STOCKS", "PRODUCTS"],
    }),
  }),
});

export const {
  useAddStockMutation,
  useDeductStockMutation,
  useGetAllStockHistoryQuery,
} = stockApi;
