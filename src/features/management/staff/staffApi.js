import { baseApi } from "../../../app/core/baseApi";

const staffPerformanceEndPoint = "admin/dashboard/staff-performance";
const staffAdminEndPoint = "admin/staffs";

const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffData: builder.query({
            query: ({ status, page = 0, size, search }) => ({
                url: `${staffPerformanceEndPoint}`,
                method: "GET",
                params: {
                    page,
                    size,
                    ...(status && { status }),
                    ...(search && { search }),
                },
            }),
            providesTags: ["staff-performance", "staffs"],
        }),

        createStaff: builder.mutation({
            query: (body) => ({
                url: `${staffAdminEndPoint}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["staff-performance", "staffs"],
        }),

        updateStaff: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${staffAdminEndPoint}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["staff-performance", "staffs"],
        }),

        terminateStaff: builder.mutation({
            query: (staffId) => ({
                url: `${staffAdminEndPoint}/${staffId}/status`,
                method: "PUT",
                params: { enable: false },
            }),
            invalidatesTags: ["staff-performance", "staffs"],
        }),

        rehiredStaff: builder.mutation({
            query: (staffId) => ({
                url: `${staffAdminEndPoint}/${staffId}/status`,
                method: "PUT",
                params: { enable: true },
            }),
            invalidatesTags: ["staff-performance", "staffs"],
        }),

        deleteStaff: builder.mutation({
            query: (staffId) => ({
                url: `${staffAdminEndPoint}/${staffId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["staff-performance", "staffs"],
        }),
    }),
});

export const {
    useGetStaffDataQuery,
    useCreateStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
    useRehiredStaffMutation,
    useTerminateStaffMutation,
} = staffApi;
