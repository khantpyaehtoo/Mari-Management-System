import { Button, Card, Col } from "antd";
import { Edit, Trash2 } from "lucide-react";

const CategoryCard = ({ item, handleActionClick }) => {
    return (
        <Col key={item.id} xs={24} sm={12} xl={6} className="flex">
            <Card className="w-full border! border-gray-300! rounded-xl! hover:shadow-md transition-shadow ">
                <h1 className="text-xl mb-5 font-semibold">{item.name}</h1>
                <div className="grid-items-2 mb-5 flex justify-between">
                    <div>
                        <p className="text-gray-500">Service price:</p>
                        <p className="my-2 text-gray-500">Duration:</p>
                    </div>
                    <div className="text-right font-medium">
                        <p>{item.price} MMK</p>
                        <p className="my-2">{item.durationInMinutes} mins</p>
                    </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-4">
                    <Button
                        onClick={(e) => handleActionClick("edit", item, e)}
                        className="bg-primary! text-white flex-1 min-w-17.5 flex items-center justify-center"
                    >
                        <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button
                        onClick={(e) => handleActionClick("delete", item, e)}
                        className="border! border-red-500! text-red-500 hover:text-white! hover:bg-red-500! flex-1 min-w-21.25 flex items-center justify-center"
                    >
                        <Trash2 size={14} />
                        Delete
                    </Button>
                </div>
            </Card>
        </Col>
    );
};

export default CategoryCard;
