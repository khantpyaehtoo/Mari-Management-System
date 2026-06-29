import {
    ArrowLeftOutlined,
    PlusCircleOutlined,
    // PlusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ServiceHeader = ({ title }) => {
    const nav = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [isFormOpen, setIsFormopen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { form } = Form.useForm();
    const { Item } = Form;

    return (
        <>
            <Space vertical size="large" className="w-full!">
                <Button
                    onClick={() =>
                        nav("/management/service", { replace: true })
                    }
                    className="bg-transparent! border-none! shadow-none! hover:underline! hover:text-black! text-xl! group"
                >
                    <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />{" "}
                    {title}
                </Button>

                <Space
                    size="large"
                    className="border-b-2 border-gray-300 py-10 px-3 w-full"
                >
                    <Input
                        value={searchText}
                        placeholder={`Search ${title}`}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="lg:w-146! md:w-120! w-100! shadow-md! py-2!"
                        prefix={<SearchOutlined className="px-3" />}
                        size="large"
                    />

                    <Button
                        variant="solid"
                        icon={<PlusCircleOutlined />}
                        className="createFormBtn!"
                        onClick={() => setIsFormopen(true)}
                    >
                        Create {title}
                    </Button>

                    <Modal
                        title={
                            <>
                                <h1 className="mt-4 mb-2 uppercase text-3xl font-semibold text-primary">
                                    {isEdit ? "Edit" : "Create"} {title}
                                </h1>
                            </>
                        }
                        open={isFormOpen}
                        onCancel={() => setIsFormopen(false)}
                        okText={isEdit ? "Update" : "Create"}
                        destroyOnHidden
                        forceRender
                        footer={null}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            autoComplete="off"
                            className="mt-5!"
                        >
                            <Item
                                label={
                                    <label className="label-styling">
                                        Service Name
                                    </label>
                                }
                                name="service-name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input service name!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Service name"
                                    className="input-styling!"
                                />
                            </Item>
                            <Item
                                label={
                                    <label className="label-styling">
                                        Package Name
                                    </label>
                                }
                                name="package-name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Package name!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Package name"
                                    className="input-styling!"
                                />
                            </Item>
                            <Space>
                                <Item
                                    label={
                                        <label className="label-styling">
                                            Service Price
                                        </label>
                                    }
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input service price!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter the Service price"
                                        className="input-styling!"
                                    />
                                </Item>
                                <Item
                                    label={
                                        <label className="label-styling">
                                            Time Duration
                                        </label>
                                    }
                                    name="time-duration"
                                    rules={[
                                        {
                                            required: true,
                                            message: "need time duration!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Time Duration"
                                        className="input-styling!"
                                    />
                                </Item>
                            </Space>
                            <Button className="w-full bg-primary! text-white! hover:border! hover:border-black!">
                                Create {title}
                            </Button>
                        </Form>
                    </Modal>
                </Space>
            </Space>
        </>
    );
};

export default ServiceHeader;
