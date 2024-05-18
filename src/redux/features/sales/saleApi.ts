import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query({
      query: () => ({
        url: "/sales-history",
        method: "GET",
      }),
      providesTags: [tagTypes.sale],
    }),

    getUserSalesHistory: builder.query({
      query: (id) => ({
        url: `/user-sales-history/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sale],
    }),

    addSale: builder.mutation({
      query: (saleData) => ({
        url: "/sales",
        method: "POST",
        body: saleData,
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useGetSalesHistoryQuery,
  useGetUserSalesHistoryQuery,
  useAddSaleMutation,
} = saleApi;
