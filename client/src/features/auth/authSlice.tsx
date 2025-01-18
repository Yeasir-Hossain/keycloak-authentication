import { apiSlice } from "@/features/api/apiSlice";
import { setValue, userLoggedOut } from "@/features/auth/authReducer";

export const authApi = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		// Login mutation with dispatch to update user state
		login: builder.mutation({
			query: (data) => ({
				url: '/user/login',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data: userData } = await queryFulfilled;
					dispatch(setValue({ target: 'user', value: userData }));
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),

		// Register mutation
		register: builder.mutation<void, { email: string; password: string; firstName: string; lastName: string }>({
			query: (data) => ({
				url: '/user/register',
				method: 'POST',
				body: data,
			}),
		}),

		// Fetch user profile with dispatch to update user state
		getMe: builder.query({
			query: () => '/user/me',
			providesTags: ['user'],
			async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
				try {
					const { data: userData } = await queryFulfilled;
					dispatch(setValue({ target: 'user', value: userData }));
				} catch (error) {
					console.error('Fetching user failed:', error);
				}
			},
		}),

		// Logout mutation with dispatch to clear user state
		logout: builder.query({
			query: () => '/user/logout',
			async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(userLoggedOut());
				} catch (error) {
					console.error('Logout failed:', error);
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLazyGetMeQuery,
	useLazyLogoutQuery,
} = authApi;
