import { apiSlice } from "@/features/api/apiSlice";

interface User {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
}

export const authApi = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		login: builder.query<string, void>({
			query: () => ({
				url: '/user/login',
			}),
			keepUnusedDataFor: 0,
		}),

		getMe: builder.query<User, void>({
			query: () => '/user/me',
			providesTags: ['user'],
			async onQueryStarted(_arg, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export const {
	useLazyLoginQuery,
	useLazyGetMeQuery
} = authApi;
