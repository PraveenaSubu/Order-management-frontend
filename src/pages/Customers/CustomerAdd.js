import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./Customer.css";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const CustomerAdd = () => {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({
        customerImg: "",
        customerName: "",
        email: "",
        address: "",
        mobileNumber: "",
        status: "",
    });

    const handleChange = (value) => {
        return setCustomerDetails((customers) => {
            return { ...customers, ...value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Customer Details ", customerDetails);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/customers`,
                customerDetails
            );
            if (response) {
                setCustomerDetails({
                    customerImg: "",
                    customerName: "",
                    email: "",
                    address: "",
                    mobileNumber: "",
                    status: "",
                });
                navigate("/customerlist");
            }
        } catch (error) {
            console.log("Error while adding customer: ", error);
        }
    };

    return (
        <>
            <div className="customerAdd">
                <Sidebar />
                <div className="customerAddContainer">
                    <Navbar />
                    <div className="addTop d-flex justify-content-between">
                        <h1 className="addNewHeading" style={{ fontSize: "20px", color: "gray" }}>Add New Customer</h1>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/customerlist" className="addLink ">
                                <FastRewindIcon />
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="addBottom">
                        <div className="addLeftSide">
                            <img
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                alt="cameraicon"
                                className="addImage"
                            />
                        </div>
                        <div className="addRightSide">
                            <form onSubmit={handleSubmit} className="addForm">
                                <div className="addFormInput">
                                    <label className="addLableStyle">Customer Name</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: John"
                                        required
                                        value={customerDetails.customerName}
                                        onChange={(e) =>
                                            handleChange({ customerName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Customer Image URL</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: https://www.imageUrl.com"
                                        required
                                        value={customerDetails.customerImg}
                                        onChange={(e) =>
                                            handleChange({ customerImg: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Email</label>
                                    <input
                                        className="addInputSytle"
                                        type="email"
                                        placeholder="Ex: john@gmail.com"
                                        required
                                        value={customerDetails.email}
                                        onChange={(e) => handleChange({ email: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Mobile Number</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: +91 9988776655"
                                        required
                                        value={customerDetails.mobileNumber}
                                        onChange={(e) =>
                                            handleChange({ mobileNumber: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Address</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="Ex: Chennai"
                                        required
                                        value={customerDetails.address}
                                        onChange={(e) => handleChange({ address: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Status</label>
                                    <select
                                        className="w-100 addInputSytle"
                                        name="Select Status"
                                        id="status"
                                        required
                                        value={customerDetails.status}
                                        onChange={(e) => handleChange({ status: e.target.value })}
                                    >
                                        <option>--Select status--</option>
                                        <option value="Active">Active</option>
                                        <option value="Passive">Passive</option>
                                    </select>
                                </div>
                                <button type="submit" className="addButton">
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerAdd;