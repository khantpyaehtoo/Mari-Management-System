import { Modal, Typography, Flex, Space } from "antd";

const WalkInDetailModal = ({ selectedWalkin, isOpen, onClose }) => {
    const totalTime = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.duration,
        0,
    );
    const totalAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.baseAmount + (s.extraCharges || 0),
        0,
    );
    const totalBaseAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + s.baseAmount,
        0,
    );
    const totalExtraAmount = selectedWalkin?.services.reduce(
        (sum, s) => sum + (s.extraCharges || 0),
        0,
    );

    const extraServicesWithNotes =
        selectedWalkin?.services?.filter((s) => s.note) || [];

    if (!selectedWalkin) return null;

    return (
        <Modal
            title={<h1>WalkIn Overview</h1>}
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <div className="w-full">
                <Space vertical className="w-full py-4">
                    <p>
                        <span className="font-semibold me-4">WalkIn ID :</span>{" "}
                        {selectedWalkin.walkInId}
                    </p>
                    <p>
                        <span className="font-semibold me-4">Date :</span>{" "}
                        {selectedWalkin.date}
                    </p>
                    <p>
                        <span className="font-semibold me-4">Staff Name :</span>{" "}
                        {selectedWalkin.staffName}
                    </p>
                </Space>

                <div className="w-full border-gray-400 border p-4 rounded-xl bg-white-back">
                    <Typography.Title
                        level={3}
                        className="font-montserrat! font-medium! text-primary!"
                    >
                        Details
                    </Typography.Title>
                    <ul className="border-b border-b-gray-400 px-7 pb-4  list-disc marker:text-primary marker:text-2xl">
                        <Space vertical>
                            <li>
                                <span className="font-semibold">
                                    Started Time :
                                </span>{" "}
                                {selectedWalkin.startedTime}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Service Name :{" "}
                                </span>
                                {selectedWalkin?.services.map((svc, i) => (
                                    <span key={i}>
                                        {svc.name}
                                        {i < selectedWalkin?.services.length - 1
                                            ? ", "
                                            : ""}
                                    </span>
                                ))}
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Duration :{" "}
                                </span>
                                {totalTime} mins
                            </li>
                            <li>
                                <span className="font-semibold">
                                    Base Amount :{" "}
                                </span>
                                {totalBaseAmount} mmk
                            </li>

                            {totalExtraAmount ? (
                                <li>
                                    <span className="font-semibold">
                                        Extra Amount :{" "}
                                    </span>
                                    {totalExtraAmount} mmk
                                </li>
                            ) : (
                                ""
                            )}
                        </Space>
                    </ul>
                    <Flex
                        justify="space-between"
                        className="p-3! font-semibold!"
                    >
                        <h3>Total Amount</h3>
                        <h3>{totalAmount} mmk</h3>
                    </Flex>
                </div>

                {extraServicesWithNotes.length > 0 && (
                    <div className="border-gray-400 border p-4 rounded-xl bg-white-back my-4">
                        <h1 className="text-primary font-medium text-base mb-2">
                            Extra Charges Note
                        </h1>
                        {extraServicesWithNotes.map((svc, i) => (
                            <p key={i} className="text-sm text-gray-700 mb-1">
                                {svc.note}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WalkInDetailModal;
