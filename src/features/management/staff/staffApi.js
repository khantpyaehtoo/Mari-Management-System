import { baseApi } from "../../../app/core/global/basicApi";
const staffEndPoint = "/staff";

const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffData: builder.query({
            query: (token) => ({
                url: `${staffEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["staff"],
        }),

        createStaff: builder.mutation({
            query: ({ getStaffData, token }) => ({
                url: `${staffEndPoint}`,
                method: "POST",
                body: getStaffData,
                header: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["staff"],
        }),

        updateStaff: builder.mutation({
            query: ({ getStaffData }) => ({
                url: `${staffEndPoint}`,
                method: "PUT",
                body: getStaffData,
            }),
            invalidatesTags: ["staff"],
        }),

        deleteStaff: builder.mutation({
            query: ({ getStaffData, token }) => ({
                url: `${staffEndPoint}`,
                method: "DELETE",
                header: { Authorization: `Bearer ${token}` },
                body: getStaffData,
            }),
            invalidatesTags: ["staff"],
        }),
    }),
});

export const {
    useGetStaffDataQuery,
    useCreateStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
} = staffApi;
