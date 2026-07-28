import { Modal, Typography, Flex, Space, Spin } from "antd";
import { useGetWalkinByIdQuery } from "./walkInApi";

const WalkInDetailModal = ({ selectedWalkin, isOpen, onClose }) => {
    const { data: walkinDetails, isLoading } = useGetWalkinByIdQuery(
        selectedWalkin?.id,
        { skip: !isOpen || !selectedWalkin?.id },
    );

    if (!selectedWalkin) return null;

    // console.log(walkinDetails);

    // Safely parse values with optional chaining to prevent crashes during loading
    const serviceName = walkinDetails?.serviceName;
    const startTime = walkinDetails?.startTime;
    const durationDisplay = walkinDetails?.duration;

    const totalAmount =
        walkinDetails?.totalCharges ||
        (walkinDetails?.totalCharges
            ? `${walkinDetails.totalCharges} MMK`
            : "");
    const extraAmount = walkinDetails?.extraAmount || 0;
    const baseAmount = walkinDetails
        ? walkinDetails.totalCharges - extraAmount
        : 0;

    return (
        <Modal
            title={<h1>WalkIn Overview</h1>}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
        >
            {isLoading ? (
                <div className="flex justify-center items-center py-12 w-full">
                    <Spin size="large" />
                </div>
            ) : walkinDetails ? (
                <div className="w-full">
                    <Space vertical className="w-full py-4">
                        <p>
                            <span className="font-semibold me-4">
                                WalkIn ID :
                            </span>{" "}
                            {walkinDetails.walkInId}
                        </p>
                        <p>
                            <span className="font-semibold me-4">Date :</span>{" "}
                            {walkinDetails.date}
                        </p>
                        <p>
                            <span className="font-semibold me-4">
                                Staff Name :
                            </span>{" "}
                            {walkinDetails.staffName}
                        </p>
                    </Space>

                    <div className="w-full border-gray-400 border p-4 rounded-xl bg-white-back">
                        <Typography.Title
                            level={3}
                            className="font-montserrat! font-medium! text-primary!"
                        >
                            Details
                        </Typography.Title>
                        <ul className="border-b border-b-gray-400 px-7 pb-4 list-disc marker:text-primary marker:text-2xl">
                            <Space vertical className="w-full">
                                <li>
                                    <span className="font-semibold">
                                        Started Time :
                                    </span>{" "}
                                    {startTime}
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Service Name :{" "}
                                    </span>
                                    <span>{serviceName}</span>
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Duration :{" "}
                                    </span>
                                    {durationDisplay}
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Base Amount :{" "}
                                    </span>
                                    {baseAmount} MMK
                                </li>

                                {extraAmount > 0 && (
                                    <li>
                                        <span className="font-semibold">
                                            Extra Amount :{" "}
                                        </span>
                                        {extraAmount} MMK
                                    </li>
                                )}
                            </Space>
                        </ul>
                        <Flex
                            justify="space-between"
                            className="p-3! font-semibold!"
                        >
                            <h3>Total Amount</h3>
                            <h3>{totalAmount} MMK</h3>
                        </Flex>
                    </div>

                    {walkinDetails.extraChargesNote && (
                        <div className="border-gray-400 border p-4 rounded-xl bg-white-back my-4">
                            <h1 className="text-primary font-medium text-base mb-2">
                                Extra Charges Note
                            </h1>
                            <p className="text-sm text-gray-700 mb-1">
                                {walkinDetails.extraChargesNote}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No details found.
                </div>
            )}
        </Modal>
    );
};

export default WalkInDetailModal;
