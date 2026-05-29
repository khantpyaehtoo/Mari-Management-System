import { Image, Typography } from "antd";

const { Title } = Typography;

const Settings = () => {
    return (
        <>
            <Title className="p-3 border-b-1" level={3}>
                Settings
            </Title>

            <section className="shadow-sm min-h-[95%]">
                <div className="h-full bg-amber-700 w-[95%] mx-auto">
                    <section className="bg-gray-50/50 w-[500px]">
                        <Title level={4} className="border-b-1 p-3">
                            Account SetUp
                        </Title>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid mx-auto">
                                <span className="!h-[40px]">Avatar : </span>
                                <span>Username : </span>
                                <span>Email : </span>
                                <span>Phone : </span>
                            </div>
                            <div className="grid mx-auto">
                                <Image
                                    src="https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg"
                                    alt="user-profile"
                                    className="rounded"
                                    width={40}
                                    height={40}
                                />
                                <span>Admin</span>
                                <span>admin@gmail.com</span>
                                <span>(+95) 9 956 145 223</span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-10">
                            <button
                                type="button"
                                className="bg-amber-200 p-3 rounded-md "
                            >
                                Edit
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default Settings;
