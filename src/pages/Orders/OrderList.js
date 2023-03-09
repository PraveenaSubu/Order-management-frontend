import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./Order.css";
import { isAuthenticated } from "../../utils/auth";

const OrderList = () => {
    const [orderData, setOrderData] = useState([]);
    const { token } = isAuthenticated();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                setOrderData(response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/orders/${id}`
            );
            if (response) {
                getOrders();
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <>
            <div className="orderList">
                <Sidebar />
                <div className="orderListContainer">
                    <Navbar />
                    <div className="orderListHeading my-2">
                        <div style={{ marginLeft: "30px" }}>Order List</div>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/orderadd" className="addLink">
                                <AddIcon />
                                Add New
                            </Link>
                        </div>
                    </div>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        className="tableCell text-secondary"
                                    >
                                        #
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Product
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Customer
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Date
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Amt (₹)
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Address
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Payment Method
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Status
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="tableCell text-secondary"
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center" className="tableCell">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <div className="cellWrapper">
                                                <img
                                                    src={row.productImg}
                                                    alt=""
                                                    className="orderImage"
                                                />
                                                {row.productName}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.customerName}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.date}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.amount}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.address}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.paymentMethod}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <span className={`orderStatus ${row.status}`}>
                                                {row.status}
                                            </span>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <Link
                                                to={`/${row._id}/orderupdate`}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Button variant="outlined" color="success">
                                                    Edit
                                                </Button>
                                            </Link>
                                            &nbsp; &nbsp;
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(row._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default OrderList;