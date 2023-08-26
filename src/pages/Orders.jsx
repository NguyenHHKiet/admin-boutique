import Paper from "@mui/material/Paper";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { transformPrice } from "../utils/transformData";

export default function Orders() {
    const { sendRequest, response, isLoading } = useAxios();

    const pathname = window.location.pathname;
    const styles = {
        height: "100vh",
        width: "100%",
        marginTop: "5rem",
        overflow: "auto",
    };

    useEffect(() => {
        sendRequest({ url: "/admin/get-orders" });
    }, [sendRequest]);

    let content;
    if (isLoading) {
        content = <>Loading...</>;
    }

    console.log(response);

    return (
        <div style={pathname === "/orders" ? styles : {}}>
            <Paper sx={{ p: 2 }}>
                <h5 className="fw-bold my-3 ">History</h5>
                {isLoading && content}
                {response ? (
                    response?.orders?.length > 0 ? (
                        <div style={{ overflow: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID User</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Total</th>
                                        <th>Delivery</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response?.orders?.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.user.userId}</td>
                                            <td>{item.user.name}</td>
                                            <td>{item.user.phone}</td>
                                            <td>{item.user.address}</td>
                                            <td>
                                                {transformPrice(
                                                    item.totalAmount
                                                )}
                                            </td>
                                            <td>{item.delivery}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link
                                                    className="p-2 text-white rounded-1"
                                                    style={{
                                                        backgroundColor:
                                                            "#22CA80",
                                                    }}>
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>Not found Orders</div>
                    )
                ) : (
                    <></>
                )}
            </Paper>
        </div>
    );
}
