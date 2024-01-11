import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { setLogout } from '../redux/reducers/mainReducer';

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}
export const backendUrl: string = import.meta.env.VITE_REACT_APP_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefresh = retry(
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      try {
        const res = await baseQuery(
          { url: 'customer/v1/auth/refresh/', method: 'POST', body: { token: localStorage.getItem('refreshToken') } },
          api,
          extraOptions,
        );
        const data = res.data as RefreshResponse;
        if (data) {
          localStorage.setItem('refreshToken', data.refresh_token);
          localStorage.setItem('accessToken', data.access_token);
          retry.fail(result.error);
        } else {
          //api.dispatch({ type: 'logout' });
          api.dispatch(setLogout(true));
        }
      } catch (error) {
        console.error(`Auth service error: ${error}`);
      }
    }
    return result;
  },
  { maxRetries: 1 },
);
