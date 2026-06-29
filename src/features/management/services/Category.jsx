import { Link } from "react-router-dom";
import ServiceHeader from "./ServiceHeader";
import { Button, Card, Col, Row, Space } from "antd";

const Category = ({ categories }) => {
    return (
        <>
            <ServiceHeader title="package" />

            <Row gutter={[16, 16]} className="mt-10!">
                {/* {categories.map((item, index))} */}
                <Col span={6}>
                    <Link>
                        <Card className="border! border-gray-300! rounded-xl!">
                            <h1 className="text-xl mb-5">Hello Category</h1>
                            <div className="grid-items-2 mb-5">
                                <div>
                                    <p>Service price: </p>
                                    <p className="my-2">duration: </p>
                                </div>
                                <div>
                                    <p>5000 mmk</p>
                                    <p className="my-2">50 mins</p>
                                </div>
                            </div>
                            <Space size="middle">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </Space>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </>
    );
};

export default Category;
