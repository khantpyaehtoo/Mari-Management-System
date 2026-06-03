import { Typography } from "antd";
import { Edit, Trash2 } from "lucide-react";
import AddServicesForm from "../components/modals/addServicesForm";

const Services = () => {
    const { Title } = Typography;

    return (
        <div>
            <div className="title-style flex justify-between items-center">
                <Title level={3}>Services</Title>

                <AddServicesForm title={"Services"} />
            </div>

            <div className="table-wrapper">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="thead-styling">Service</th>
                                <th className="thead-styling">Price</th>
                                <th className="thead-styling">ID</th>
                                <th className="thead-styling text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* {products.map((product) => ( */}
                            <tr
                                // key={product.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 shadow-sm">
                                            {/* <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                /> */}
                                        </div>
                                        <span className="font-bold text-gray-800 text-lg">
                                            {/* {product.name} */}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-700 font-black">
                                        {/* {product.price.toLocaleString()}{" "} */}
                                        <small className="text-gray-400">
                                            MMK
                                        </small>
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md uppercase">
                                        {/* #{product.id.toString().slice(0, 8)} */}
                                        ...
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            // onClick={() =>
                                            //     handleEditClick(product)
                                            // }
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            // onClick={() =>
                                            //     handleDeleteClick(
                                            //         product.id,
                                            //         product.name,
                                            //     )
                                            // }
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* ))} */}

                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-20 text-center text-gray-400 italic font-medium"
                                >
                                    No products found in the database.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Services;
