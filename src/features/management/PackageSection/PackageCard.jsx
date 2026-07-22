import { Button, Card, Col } from "antd";
import { Edit, Star, StarX } from "lucide-react";

const PackageCard = ({ item, handleActionClick, isDisabledView = false }) => {
    const isItemDisabled = isDisabledView || item.enabled === false;

    return (
        <Col key={item.id} xs={24} sm={12} xl={6} className="flex">
            <Card className="w-full min-h-65! border border-gray-200! rounded-xl shadow-xs hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between">
                {/* Header Section */}
                <h1 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">
                    {item.name}
                </h1>

                {/* Details Section */}
                <div className="space-y-3 mb-6 text-sm">
                    {/* Includes Services Row */}
                    <div className="flex justify-between items-start gap-4">
                        <span className="text-gray-400 shrink-0">
                            Includes Services:
                        </span>
                        <span
                            className="text-right font-semibold text-primary wrap-break-words max-w-[65%] line-clamp-2"
                            title={
                                item.includedServices &&
                                item.includedServices.length > 0
                                    ? item.includedServices.join(", ")
                                    : "No services"
                            }
                        >
                            {item.includedServices &&
                            item.includedServices.length > 0
                                ? item.includedServices.join(", ")
                                : "No services"}
                        </span>
                    </div>

                    {/* Package Price Row */}
                    <div className="flex justify-between items-baseline gap-4">
                        <span className="text-gray-400 shrink-0">
                            Package price:
                        </span>
                        <span className="text-right font-medium text-gray-600">
                            {Number(item.price).toLocaleString()} MMK
                        </span>
                    </div>

                    {/* Duration Row */}
                    <div className="flex justify-between items-baseline gap-4">
                        <span className="text-gray-400 shrink-0">
                            Duration:
                        </span>
                        <span className="text-right font-medium text-gray-600">
                            {item.durationInMinutes || item.duration || 0} mins
                        </span>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="flex gap-2 w-full mt-auto pt-2 border-t border-gray-100">
                    <Button
                        onClick={(e) => handleActionClick("edit", item, e)}
                        className="bg-primary! hover:bg-primary-hover! text-white border-none flex-1 h-9 flex items-center justify-center rounded-lg font-medium transition-colors"
                    >
                        <Edit size={14} className="mr-1.5" /> Edit
                    </Button>

                    {isItemDisabled ? (
                        <Button
                            onClick={(e) =>
                                handleActionClick("enable", item, e)
                            }
                            className="border border-emerald-200! text-emerald-600 hover:text-white! hover:bg-emerald-600! flex-1 h-9 flex items-center justify-center rounded-lg font-medium transition-colors"
                        >
                            <Star size={14} className="mr-1.5" /> Enable
                        </Button>
                    ) : (
                        <Button
                            onClick={(e) =>
                                handleActionClick("delete", item, e)
                            }
                            className="border border-red-200! text-red-500 hover:text-white! hover:bg-red-500! flex-1 h-9 flex items-center justify-center rounded-lg font-medium transition-colors"
                        >
                            <StarX size={14} className="mr-1.5" /> Disable
                        </Button>
                    )}
                </div>
            </Card>
        </Col>
    );
};

export default PackageCard;
