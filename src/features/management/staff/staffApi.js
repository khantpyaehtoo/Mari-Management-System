import { baseApi } from "../../../app/core/global/basicApi";
const staffEndPoint = "/staffs";

const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffData: builder.query({
            query: (token) => ({
                url: `${staffEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["staffs"],
        }),

        createStaff: builder.mutation({
            query: ({ getStaffData, token }) => ({
                url: `${staffEndPoint}`,
                method: "POST",
                body: getStaffData,
                header: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["staffs"],
        }),

        updateStaff: builder.mutation({
            query: ({ getStaffData }) => ({
                url: `${staffEndPoint}`,
                method: "PATCH",
                body: getStaffData,
            }),
            invalidatesTags: ["staffs"],
        }),

        deleteStaff: builder.mutation({
            query: ({ getStaffData, token }) => ({
                url: `${staffEndPoint}`,
                method: "DELETE",
                header: { Authorization: `Bearer ${token}` },
                body: getStaffData,
            }),
            invalidatesTags: ["staffs"],
        }),
    }),
});

export const {
    useGetStaffDataQuery,
    useCreateStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
} = staffApi;
