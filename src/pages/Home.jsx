import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Orders from "./Orders";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { transformPrice } from "../utils/transformData";

export default function Dashboard() {
    const { sendRequest, response } = useAxios();

    useEffect(() => {
        sendRequest({ url: "/admin/get-orders" });
    }, [sendRequest]);

    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
            }}>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper
                            sx={{
                                display: "grid",
                                height: 100,
                                gridTemplateColumns: "auto auto auto",
                                gap: "1rem",
                                overflow: "hidden",
                            }}>
                            <div
                                style={{
                                    borderRight: "1px solid #d5d3da",
                                    padding: "1rem ",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <span>
                                    <h2>{response?.qtyUser || 0}</h2>
                                    <div
                                        style={{
                                            color: "gray",
                                            marginTop: "-0.75rem",
                                        }}>
                                        Clients
                                    </div>
                                </span>
                                <span>
                                    <PersonAddAltOutlinedIcon
                                        style={{
                                            color: "gray",
                                            fontSize: "2rem",
                                        }}
                                    />
                                </span>
                            </div>
                            <div
                                style={{
                                    borderRight: "1px solid #d5d3da",
                                    padding: "1rem ",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <span>
                                    <h2>
                                        {
                                            transformPrice(
                                                response?.earnings || 0
                                            ).split(" ")[0]
                                        }
                                        <sup
                                            style={{
                                                fontSize: "1rem",
                                                top: "-1em",
                                            }}>
                                            VND
                                        </sup>
                                    </h2>
                                    <div
                                        style={{
                                            color: "gray",
                                            marginTop: "-0.75rem",
                                        }}>
                                        Earnings of Month
                                    </div>
                                </span>
                                <span>
                                    <AttachMoneyOutlinedIcon
                                        style={{
                                            color: "gray",
                                            fontSize: "2rem",
                                        }}
                                    />
                                </span>
                            </div>
                            <div
                                style={{
                                    padding: "1rem ",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <span>
                                    <h2>{response?.qtyOrders || 0}</h2>
                                    <div
                                        style={{
                                            color: "gray",
                                            marginTop: "-0.75rem",
                                        }}>
                                        New Order
                                    </div>
                                </span>
                                <span>
                                    <NoteAddOutlinedIcon
                                        style={{
                                            color: "gray",
                                            fontSize: "2rem",
                                        }}
                                    />
                                </span>
                            </div>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Orders />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
