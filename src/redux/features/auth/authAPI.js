import { baseApi } from '../../api/base-api';

import { API_ENDPOINTS } from '../../../utils/api-endpoints';

// ----------------------------------------------------------------------

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
