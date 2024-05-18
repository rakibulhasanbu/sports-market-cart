import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

const addToCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddToCardByUser: builder.query({
      query: (id) => ({
        url: `/add-to-card/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.addToCard],
    }),

    addAddToCard: builder.mutation({
      query: (addToCardData) => ({
        url: "/add-to-card",
        method: "POST",
        body: addToCardData,
      }),
      invalidatesTags: [tagTypes.addToCard],
    }),
  }),
});

export const { useGetAddToCardByUserQuery, useAddAddToCardMutation } =
  addToCardApi;
