import { baseApi } from './baseApi';

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => `/report?page=${page}&limit=${limit}`,
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
        body: id, // Ensure ID is sent if required, though typically irrelevant for DELETE if in URL
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
