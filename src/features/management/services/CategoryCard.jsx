import { Button, Card, Col } from "antd";
import { Edit, RefreshCcw, Trash2 } from "lucide-react";

const CategoryCard = ({
    item,
    categories = [],
    handleActionClick,
    isDeletedMode,
}) => {
    const matchedCategory = categories.find(
        (cat) => String(cat?.id) === String(item?.categoryId),
    );
    const categoryName = item?.categoryName || matchedCategory?.name || "N/A";

    return (
        <Col key={item.id} xs={24} sm={12} xl={6} className="flex">
            <Card className="w-full min-h-55 border! border-gray-300! rounded-xl! hover:shadow-md transition-shadow">
                <h1 className="text-xl mb-5 font-montserrat font-semibold line-clamp-1">
                    {item.name}
                </h1>
                <div className="grid-items-2 mb-5 flex justify-between">
                    <div>
                        <p className="text-gray-500">Service price:</p>
                        <p className="my-2 text-gray-500">Duration:</p>
                        <p className="text-gray-500">Category:</p>
                    </div>
                    <div className="text-right font-medium">
                        <p>{item.price} MMK</p>
                        <p className="my-2">{item.durationInMinutes} mins</p>
                        <p className="text-primary font-semibold">
                            {categoryName}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-4">
                    <Button
                        onClick={(e) => handleActionClick("edit", item, e)}
                        className="bg-primary! text-white flex-1 min-w-17.5 flex items-center justify-center"
                    >
                        <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    {!isDeletedMode ? (
                        <Button
                            onClick={(e) =>
                                handleActionClick("delete", item, e)
                            }
                            className="border! border-red-500! hover:text-white! hover:bg-red-500! flex-1 min-w-21.25 flex items-center justify-center"
                        >
                            <Trash2 size={14} />
                            Delete
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) =>
                                handleActionClick("restore", item, e)
                            }
                            className="border! border-available! hover:text-white! hover:bg-available! flex-1 min-w-21.25 flex items-center justify-center"
                        >
                            <RefreshCcw size={14} />
                            Restore
                        </Button>
                    )}
                </div>
            </Card>
        </Col>
    );
};

export default CategoryCard;
