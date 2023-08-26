import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/Form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import { transformPrice } from "../utils/transformData";
import "../assets/ListOfProduct.css";
import { Button } from "@mui/material";
import axios from "axios";

const ListOfProduct = () => {
    const [data, setData] = useState(null);
    const { response, sendRequest, isLoading } = useAxios();

    useEffect(() => {
        sendRequest({ url: "/admin/get-products" }, setData);
    }, [sendRequest]);

    let content;
    if (isLoading) {
        content = (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "20rem" }}>
                <Spinner animation="border" />
            </div>
        );
    }

    const styleButton = (color) => ({
        textDecoration: "none",
        padding: "0.375rem",
        marginRight: "0.25rem",
        color: "white",
        backgroundColor: color,
        borderRadius: "0.125rem",
    });

    const deleteHandle = (productId) => {
        let text = "Press a button delete product!\nEither OK or Cancel.";
        if (window.confirm(text) === true) {
            axios.delete("/admin/delete-product/" + productId).then(() => {
                setData((preData) =>
                    preData.filter((item) => item._id !== productId)
                );
            });
        } else {
            console.log("You canceled!");
        }
    };

    return (
        <div
            style={{
                overflow: "auto",
                marginTop: "4rem",
                width: "100%",
            }}>
            {!response && isLoading && content}
            {response && !isLoading && (
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Form.Group
                            style={{ maxWidth: "15rem", marginBlock: "2rem" }}>
                            <Form.Label className="fw-bold">
                                Products
                            </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Search!"
                            />
                        </Form.Group>
                        <div style={{ overflow: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Category</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {response ? (
                                        data.length > 0 ? (
                                            data.map((item) => (
                                                <tr key={item._id}>
                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {transformPrice(
                                                            item.price
                                                        )}
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={item.img1}
                                                            alt={item.name}
                                                            width="100"
                                                            height="100"
                                                        />
                                                    </td>
                                                    <td>{item.category}</td>
                                                    <td className="d-flex">
                                                        <Link
                                                            to={`/update/${item._id}`}
                                                            style={styleButton(
                                                                "#22CA80"
                                                            )}>
                                                            Update
                                                        </Link>

                                                        <Button
                                                            onClick={() =>
                                                                deleteHandle(
                                                                    item._id
                                                                )
                                                            }
                                                            style={styleButton(
                                                                "#FF4F70"
                                                            )}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{ height: "20vh" }}>
                                                Not Product in Cart
                                            </div>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </Grid>
            )}
        </div>
    );
};

export default ListOfProduct;
