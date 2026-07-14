import { useState, useEffect } from "react";
import { Modal, Space, Avatar, Form, Input } from "antd";
import RenderStaffFooterButtons from "./RenderStaffFooterBtn";

const StaffDetailModal = ({
    isDetailOpen,
    handleClose,
    selectedStaff,
    onSave,
    onDelete,
    reHired,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedStaff) {
            form.setFieldsValue({
                name: selectedStaff.name,
                phone: selectedStaff.phone,
                email: selectedStaff.email,
                dob: selectedStaff.dob,
            });
        }
    }, [selectedStaff, isDetailOpen, form]);

    const handleCancelEdit = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(selectedStaff.staffId);
        }
        handleClose();
    };

    const handleSave = async () => {
        try {
            const formValue = await form.validateFields();
            if (onSave && selectedStaff) {
                const updateStaffFields = { ...selectedStaff, ...formValue };
                await onSave(updateStaffFields);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleRehired = async () => {
        if (reHired) {
            reHired(selectedStaff.staffId);
        }
        handleClose();
    };

    return (
        <Modal
            title={<h1>{isEditing ? "Edit Detail" : "View Detail"}</h1>}
            open={isDetailOpen}
            onCancel={() => {
                handleCancelEdit();
                handleClose();
            }}
            footer={null}
        >
            {selectedStaff && (
                <Form
                    form={form}
                    layout="horizontal"
                    component="form"
                    className="w-full p-5!"
                >
                    <Space size="large" className="border-b w-full py-4">
                        <Avatar
                            src={selectedStaff.profileUrl}
                            size="large"
                            className="w-15! h-15!"
                        />
                        <Space vertical size={0}>
                            {isEditing ? (
                                <Form.Item name="name" className="mb-0!">
                                    <Input
                                        placeholder={selectedStaff.name}
                                        className="font-semibold! text-xl! border! border-b-gray-300!"
                                        style={{ width: 200 }}
                                    />
                                </Form.Item>
                            ) : (
                                <h1 className="text-xl font-semibold">
                                    {selectedStaff.name}
                                </h1>
                            )}
                            <p className="text-gray-400 text-sm">
                                {selectedStaff.staffId}
                            </p>
                        </Space>
                    </Space>

                    <Space
                        vertical
                        className="border-b w-full py-3"
                        size="middle"
                    >
                        <div className="flex justify-between items-center gap-2 h-8">
                            <span className="font-medium min-w-25">Phone:</span>
                            {isEditing ? (
                                <Form.Item
                                    name="phone"
                                    className="mb-0! flex-1!"
                                    rules={[{ required: true, message: "" }]}
                                >
                                    <Input
                                        placeholder={selectedStaff.phone}
                                        className="font-montserrat! border! border-b-gray-300!"
                                    />
                                </Form.Item>
                            ) : (
                                <span>{selectedStaff.phone}</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center gap-2 h-8">
                            <span className="font-medium min-w-25">Email:</span>
                            {isEditing ? (
                                <Form.Item
                                    name="email"
                                    className="mb-0! flex-1!"
                                    rules={[
                                        {
                                            type: "email",
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={selectedStaff.email}
                                        className="font-montserrat! border! border-b-gray-300!"
                                    />
                                </Form.Item>
                            ) : (
                                <span>{selectedStaff.email}</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center gap-2 h-8">
                            <span className="font-medium min-w-25">
                                DATE OF BIRTH:
                            </span>
                            <span>{selectedStaff.dob}</span>
                        </div>
                    </Space>

                    <Space
                        vertical
                        className="border-b w-full py-3 mb-10"
                        size="middle"
                    >
                        <p className="flex justify-between items-center">
                            <span className="font-medium min-w-25 inline-block">
                                Customer Count:
                            </span>{" "}
                            {selectedStaff.count}
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-medium min-w-25 inline-block">
                                Rating:
                            </span>{" "}
                            {selectedStaff.rating}
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-medium min-w-25 inline-block">
                                Revenue:
                            </span>{" "}
                            {selectedStaff.revenue}
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-medium min-w-25 inline-block">
                                Commission:
                            </span>{" "}
                            {selectedStaff.commission}
                        </p>
                    </Space>

                    {/* Action Footer Buttons */}
                    <RenderStaffFooterButtons
                        handleClose={handleClose}
                        selectedStaff={selectedStaff}
                        handleDelete={handleDelete}
                        handleRehired={handleRehired}
                        handleSave={handleSave}
                        handleCancelEdit={handleCancelEdit}
                        isEditing={isEditing}
                        setIsEditing={() => setIsEditing(true)}
                    />
                </Form>
            )}
        </Modal>
    );
};

export default StaffDetailModal;
