
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' , credentials: 'include',headers: {
  "Content-Type": "application/json",
}});

export const apiSlice = createApi({ 
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});