import { baseApi } from "../../../app/core/global/basicApi";
const staffEndPoint = "staffs";

const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffData: builder.query({
            query: () => ({
                url: `${staffEndPoint}`,
                method: "GET",
            }),
            providesTags: ["staffs"],
        }),

        createStaff: builder.mutation({
            query: (body) => ({
                url: `${staffEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["staffs"],
        }),

        updateStaff: builder.mutation({
            query: ({ getStaffData }) => ({
                url: `${staffEndPoint}/:id`,
                method: "PATCH",
                body: getStaffData,
            }),
            invalidatesTags: ["staffs"],
        }),

        deleteStaff: builder.mutation({
            query: ({ getStaffData }) => ({
                url: `${staffEndPoint}`,
                method: "DELETE",
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
