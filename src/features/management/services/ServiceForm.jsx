import { Form, Input, Space, Button, Modal } from "antd";

const ServiceForm = ({
    form,
    handleCancel,
    isModalVisible,
    isEdit,
    selectedService,
    title,
}) => {
    const { Item } = Form;

    return (
        <Modal
            title={
                <>
                    <h1 className="mt-4 mb-2 uppercase text-3xl font-semibold text-primary">
                        {isEdit
                            ? `Edit "${selectedService?.name || "Service"}"`
                            : `Create New ${title}`}
                    </h1>
                </>
            }
            open={isModalVisible}
            onCancel={handleCancel}
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
                        <label className="label-styling">Service Name</label>
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
                {/* {title === "Services" && (
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
                                            message:
                                                "Please input Package name!",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Package name"
                                        className="input-styling!"
                                    />
                                </Item>
                            )} */}
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
                                message: "Please input service price!",
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
                {isEdit ? (
                    <Space>
                        <Button
                            className="w-full hover:border! hover:text-primary! hover:border-black!"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            className="w-full bg-primary! text-white! hover:border! hover:border-black!"
                        >
                            Save
                        </Button>
                    </Space>
                ) : (
                    <Button className="w-full bg-primary! text-white! hover:border! hover:border-black!">
                        Create {title}
                    </Button>
                )}
            </Form>
        </Modal>
    );
};

export default ServiceForm;
