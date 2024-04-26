import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users'


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        resetEmail: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetEmail`,
                method: 'POST',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/changePassword`,
                method: 'POST',
                body: data
            })
        }),


        updateName: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateName`,
                method: 'PUT',
                body: data
            })
        }),

        updatePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updatePassword`,
                method: 'PUT',
                body: data
            })
        }),

        updateMobile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateMobile`,
                method: 'PUT',
                body: data
            })
        }),

        updateBank: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateBank`,
                method: 'PUT',
                body: data
            })
        }),



    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useResetEmailMutation,
    useChangePasswordMutation,
    useUpdateNameMutation,
    useUpdatePasswordMutation,
    useUpdateMobileMutation,
    useUpdateBankMutation

}
    = userApiSlice 