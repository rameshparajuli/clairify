import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.model";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "user/profile",
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
