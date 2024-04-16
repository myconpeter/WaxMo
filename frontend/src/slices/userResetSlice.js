import { resetApiSlice } from "./apiSlice";

const USERS_URL = '/api/users'


export const userApiSlice = resetApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        resetEmail: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resetEmail`,
                method: 'POST',
                body: data
            })
        }),





    })
})


export const {
    useResetEmailMutation

}
    = resetApiSlice 