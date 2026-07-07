import { Form, Input, Select, Space, Button } from "antd";

const PackageForm = ({ form, isEditing }) => {
    return (
        <Form layout="vertical" form={form}>
            <Form.Item label="Service Name">
                <Select className="input-styling!" />
            </Form.Item>
            <Form.Item label="Package Name">
                <Input className="input-styling!" />
            </Form.Item>
            <Space>
                <Form.Item label="Package Price">
                    <Input className="input-styling!" />
                </Form.Item>
                <Form.Item label="Package Duration">
                    <Input className="input-styling!" />
                </Form.Item>
            </Space>

            <Space size="medium">
                {isEditing && (
                    <>
                        <Button
                            type="primary"
                            // onClick={handleSave}
                            className="p-5! rounded-lg! text-white!"
                        >
                            Save
                        </Button>
                        <Button
                            // onClick={handleCancelEdit}
                            className="p-5! rounded-lg!"
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </Space>
        </Form>
    );
};

export default PackageForm;
