import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = Cookies.get('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('ngrok-skip-browser-warning', 'true');
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (result.error.data?.message === 'Your session is expired') {
            toast.error('Your session has expired. Please login again.');
            api.dispatch({ type: 'auth/logout' });
        }
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Reports'], // Add other tag types here as needed
    endpoints: () => ({}),
});
