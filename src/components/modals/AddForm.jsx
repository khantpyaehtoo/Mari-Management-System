import { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../app/core/notiSlice";
import { FORM_CONFIG } from "../../lib/config/formConfig";

const AddForm = ({
    title,
    btnTitle,
    subFormTitle,
    initialValue,
    isEdit,
    isOpen,
    onCancel,
    triggerEdit,
    triggerCreate,
}) => {
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { token } = useSelector((state) => state?.auth);

    const isModalOpen = isOpen || isLocalModalOpen;

    // Get configuration
    const config = FORM_CONFIG[title];
    const ActiveComponent = config?.Component;

    const dispatch = useDispatch();

    useEffect(() => {
        if (isModalOpen && initialValue) {
            form.setFieldsValue(initialValue);
        } else if (!isModalOpen) {
            form.resetFields();
        }
    }, [isModalOpen, initialValue, form]);

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

            const triggerMutation = isEdit ? triggerEdit : triggerCreate;

            if (!triggerMutation) {
                throw new Error("Mutation not defined");
            }

            // Returning data for Edit mode handling
            const payload = isEdit
                ? { id: initialValue.id, body: values, token }
                : values;

            const data = await triggerMutation(payload).unwrap();

            if (data) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: isEdit
                            ? "Updated successfully"
                            : "Created successfully",
                    }),
                );
                form.resetFields();
                setIsLocalModalOpen(false);
                if (onCancel) onCancel();
            }
        } catch (err) {
            if (err.errorFields) {
                console.log("Validation Failed:", err.errorFields);
                return;
            }

            let errorMessage =
                err?.data?.message || err?.message || "Something went wrong..";

            console.error("Form Submission failed", err);
            dispatch(
                setMessage({
                    msgType: "error",
                    msgContent: errorMessage || "Error occurred",
                }),
            );
        }
    };

    const handleCancel = () => {
        setIsLocalModalOpen(false);
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    };

    return (
        <>
            <Button
                variant="solid"
                onClick={showModal}
                icon={<PlusCircleOutlined />}
                className="createFormBtn!"
            >
                {!btnTitle ? `Create ${title}` : `Create ${btnTitle}`}
            </Button>

            <Modal
                title={
                    <>
                        <h1 className="mt-4 mb-2 uppercase text-3xl font-semibold text-primary">
                            {isEdit ? "Edit" : "Create"} {title}
                        </h1>
                        <p className="p-1 mb-10 font-medium  text-xs">
                            {subFormTitle}
                        </p>
                    </>
                }
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEdit ? "Update" : "Create"}
                destroyOnHidden={true}
                forceRender={false}
            >
                {ActiveComponent && <ActiveComponent form={form} />}
            </Modal>
        </>
    );
};

export default AddForm;
