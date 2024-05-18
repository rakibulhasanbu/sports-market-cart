import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypesList";
import { serverUrl } from "../../config";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: serverUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,

  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
