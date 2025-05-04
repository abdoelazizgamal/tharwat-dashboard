import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.g-so.com/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Reports'],
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => '/report',
      providesTags: ['Reports'],
    }),
    getSingleReport: builder.query({
      query: (id) => `/report/${id}`,
      providesTags: ['Reports'],
    }),
    createReport: builder.mutation({
      query: (reportData) => ({
        url: '/report/add',
        method: 'POST',
        body: reportData,
      }),
      invalidatesTags: ['Reports'],
    }),
    updateReport: builder.mutation({
      query: ({ id, ...reportData }) => ({
        url: `/report/edit/${id}`,
        method: 'PUT',
        body: reportData,
      }),
      invalidatesTags: ['Reports'],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/report/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetSingleReportQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportsApi;
