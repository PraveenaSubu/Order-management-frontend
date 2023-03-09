import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Customer.css";
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
import { isAuthenticated } from "../../utils/auth";

const CustomerList = () => {
    const [customerData, setCustomerData] = useState([]);
    const { token } = isAuthenticated();

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/customers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                setCustomerData(response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/customers/${id}`
            );
            if (response) {
                getCustomers();
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <>
            <div className="customerList">
                <Sidebar />
                <div className="customerListContainer">
                    <Navbar />
                    <div className="customerListHeading my-2">
                        <div style={{ marginLeft: "30px" }}>Customers List</div>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/customeradd" className="addLink">
                                <AddIcon />
                                Add New
                            </Link>
                        </div>
                    </div>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" className="tableCell text-secondary">
                                        #
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Customer
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Email
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Mobile Number
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Address
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-primary">
                                        Status
                                    </TableCell>
                                    <TableCell align="center" className="tableCell text-secondary">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customerData.map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center" className="tableCell">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <div className="cellWrapper">
                                                <img
                                                    src={row.customerImg}
                                                    alt=""
                                                    className="customerImage"
                                                />
                                                {row.customerName}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.email}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.mobileNumber}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            {row.address}
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <span className={`customerStatus ${row.status}`}>
                                                {row.status}
                                            </span>
                                        </TableCell>
                                        <TableCell align="center" className="tableCell">
                                            <Link
                                                to={`/${row._id}/customerupdate`}
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

export default CustomerList;