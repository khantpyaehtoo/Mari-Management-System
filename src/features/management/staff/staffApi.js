import { baseApi } from "../../../app/core/basicApi";
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
            query: ({ staffId, updatedStaffFields }) => ({
                url: `${staffEndPoint}/${staffId}`,
                method: "PUT",
                body: updatedStaffFields,
            }),
            invalidatesTags: ["staffs"],
        }),

        terminateStaff: builder.mutation({
            query: ({ staffId }) => ({
                url: `${staffEndPoint}/${staffId}`,
                method: "POST",
            }),
            invalidatesTags: ["staffs"],
        }),

        deleteStaff: builder.mutation({
            query: ({ staffId }) => ({
                url: `${staffEndPoint}/${staffId}`,
                method: "DELETE",
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
    useTerminateStaffMutation,
} = staffApi;
