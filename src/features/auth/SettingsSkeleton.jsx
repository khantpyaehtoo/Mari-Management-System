import { Skeleton } from "antd";

const SettingsSkeleton = () => {
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center lg:w-1/4 pt-4">
            <Skeleton.Avatar active size={140} shape="circle" />
            <Skeleton.Button active size="small" className="mt-4 w-32" />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Skeleton.Button active size="small" className="mb-2 w-20" />
                <Skeleton.Input active block size="large" />
            </div>
            <div>
                <Skeleton.Button active size="small" className="mb-2 w-28" />
                <Skeleton.Input active block size="large" />
            </div>
            <div>
                <Skeleton.Button active size="small" className="mb-2 w-24" />
                <Skeleton.Input active block size="large" />
            </div>
            <div>
                <Skeleton.Button active size="small" className="mb-2 w-16" />
                <Skeleton.Input active block size="large" />
            </div>
        </div>
    </div>;
};

export default SettingsSkeleton;
