import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

const TableList = () => {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/orders`
            );
            if (response) {
                setOrderData(response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <>
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
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Product
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Customer
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Date
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Amount (₹)
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Address
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Payment Method
                            </TableCell>
                            <TableCell
                                align="center"
                                className="tableCell text-primary"
                            >
                                Status
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
                                        <img src={row.productImg} alt="" className="orderImage" />
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableList;