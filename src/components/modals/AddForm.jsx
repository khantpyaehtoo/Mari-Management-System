import { useEffect, useState } from "react";
import { Button, Form, Modal, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import { FORM_CONFIG } from "../../lib/config/formConfig";

const AddForm = ({ title, initialValues, isEditMode, open, onCancel }) => {
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { token } = useSelector((state) => state.auth);

    const isModalOpen = open !== undefined ? open : isLocalModalOpen;

    // Get configuration
    const config = FORM_CONFIG[title];

    // Call mutations
    const useCreateMutation = config?.useCreateMutation;
    const createMutation = useCreateMutation();
    const [triggerCreateMutation] = createMutation;

    const useEditMutation = config?.useEditMutation;
    const editMutation = useEditMutation();
    const [triggerEditMutation] = editMutation;

    const ActiveComponent = config?.Component;

    const { Title } = Typography;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isModalOpen && initialValues) {
            form.setFieldsValue(initialValues);
        } else if (!isModalOpen) {
            form.resetFields();
        }
    }, [isModalOpen, initialValues, form]);

    const showModal = () => {
        setIsLocalModalOpen(true);
    };

    if (!config) {
        return null;
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form Values", values);

            const triggerMutation = isEditMode
                ? triggerEditMutation
                : triggerCreateMutation;

            if (!triggerMutation) {
                throw new Error("Mutation not defined");
            }

            // Returning data for Edit mode handling
            const payload = isEditMode
                ? { id: initialValues.id, body: values, token }
                : values;

            const { data, error } = await triggerMutation(payload);

            if (data) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: isEditMode
                            ? "Updated successfully"
                            : "Created successfully",
                    }),
                );
                form.resetFields();
                if (onCancel) {
                    onCancel();
                } else {
                    setIsLocalModalOpen(false);
                }
            } else {
                console.log("Mutation Error:", error);

                let errorMessage =
                    error?.data?.message ||
                    error?.error ||
                    error?.message ||
                    "Something went wrong..";

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
                    msgContent: err.message || "Error occurred",
                }),
            );
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setIsLocalModalOpen(false);
        }
        form.resetFields();
    };

    return (
        <>
            {open === undefined && (
                <Button
                    color="default"
                    variant="solid"
                    onClick={showModal}
                    icon={<PlusCircleOutlined />}
                >
                    Create {title}
                </Button>
            )}

            <Modal
                title={
                    <Title className="uppercase" level={3}>
                        {isEditMode ? "Edit" : "Create"} {title}
                    </Title>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditMode ? "Update" : "Create"}
            >
                {ActiveComponent && <ActiveComponent form={form} />}
            </Modal>
        </>
    );
};

export default AddForm;
