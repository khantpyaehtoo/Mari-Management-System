import { useState } from "react";
import { Button, Form, Modal, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import { FORM_CONFIG } from "../../lib/config/formConfig";

const AddForm = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    // Get configuration
    const config = FORM_CONFIG[title];

    // Call create mutation
    const useEntityMutation = config?.useCreateMutation;
    const [triggerMutation] = useEntityMutation();
    const ActiveComponent = config?.Component;

    const { Title } = Typography;
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    if (!config) {
        console.error("Form type is not defined");
        return null;
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form Values", values);
            const { data, error } = await triggerMutation(values);

            if (data) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Successful",
                    }),
                );
                console.log(data);
                form.resetFields();
                setIsModalOpen(false);
            } else {
                const errorMessage =
                    error?.data?.message || "something went wrong..";
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: errorMessage,
                    }),
                );
            }
        } catch (err) {
            if (err.errorFields) {
                console.log("Validation Failed:", err.errorFields);
                return;
            }

            console.error("Form Submission failed", err);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: "Error occurred",
                }),
            );
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button
                color="default"
                variant="solid"
                onClick={showModal}
                icon={<PlusCircleOutlined />}
            >
                Create {title}
            </Button>

            <Modal
                title={
                    <Title className="uppercase" level={3}>
                        Create {title}
                    </Title>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create"
            >
                <ActiveComponent form={form} />
            </Modal>
        </>
    );
};

export default AddForm;
