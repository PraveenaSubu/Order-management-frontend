import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./Order.css";
import FastRewindIcon from "@mui/icons-material/FastRewind";

const OrderUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({
        productImg: "",
        productName: "",
        customerName: "",
        date: "",
        amount: "",
        address: "",
        paymentMethod: "",
        status: "",
    });

    const handleChange = (value) => {
        return setOrderDetails((orders) => {
            return { ...orders, ...value };
        });
    };

    useEffect(() => {
        const id = params.id.toString();
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/orders/${id}`)
            .then((response) => {
                setOrderDetails(response.data);
                console.log("Reponse: ", response.data);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Order Details ", orderDetails);
        try {
            const id = params.id.toString();
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/orders/${id}`,
                orderDetails
            );
            if (response) {
                setOrderDetails({
                    productImg: "",
                    productName: "",
                    customerName: "",
                    date: "",
                    amount: "",
                    address: "",
                    paymentMethod: "",
                    status: "",
                });
                navigate("/orderlist");
            }
        } catch (error) {
            console.log("Erro while adding order: ", error);
        }
    };

    return (
        <>
            <div className="orderAdd">
                <Sidebar />
                <div className="orderAddContainer">
                    <Navbar />
                    <div className="addTop d-flex justify-content-between">
                        <h1 className="addHeading" style={{ fontSize: "20px", color: "gray" }}>Update Order Details</h1>
                        <div style={{ marginRight: "30px" }}>
                            <Link to="/orderlist" className="addLink ">
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
                                    <label className="addLableStyle">Product</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="mac book"
                                        value={orderDetails.productName}
                                        onChange={(e) =>
                                            handleChange({ productName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Product Image URL</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="www.image_url.com"
                                        value={orderDetails.productImg}
                                        onChange={(e) =>
                                            handleChange({ productImg: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Customer Name</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="john doe"
                                        value={orderDetails.customerName}
                                        onChange={(e) =>
                                            handleChange({ customerName: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Date</label>
                                    <input
                                        className="addInputSytle"
                                        type="date"
                                        min="2000-01-01"
                                        max="2050-12-31"
                                        placeholder="date"
                                        value={orderDetails.date}
                                        onChange={(e) => handleChange({ date: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Amount (₹)</label>
                                    <input
                                        className="addInputSytle"
                                        type="number"
                                        placeholder="amount"
                                        value={orderDetails.amount}
                                        onChange={(e) => handleChange({ amount: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Address</label>
                                    <input
                                        className="addInputSytle"
                                        type="text"
                                        placeholder="eg. chennai"
                                        value={orderDetails.address}
                                        onChange={(e) => handleChange({ address: e.target.value })}
                                    />
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Payment Method</label>
                                    <select
                                        className="w-100 addInputSytle"
                                        name="Select Status"
                                        id="status"
                                        value={orderDetails.paymentMethod}
                                        onChange={(e) =>
                                            handleChange({ paymentMethod: e.target.value })
                                        }
                                    >
                                        <option>--Select Payment Method--</option>
                                        <option value="Cash on delivery">Cash on Delivery</option>
                                        <option value="Online payment">Online Payment</option>
                                    </select>
                                </div>
                                <div className="addFormInput">
                                    <label className="addLableStyle">Status</label>
                                    <select
                                        className="w-100 addInputSytle"
                                        name="Select Status"
                                        id="status"
                                        value={orderDetails.status}
                                        onChange={(e) => handleChange({ status: e.target.value })}
                                    >
                                        <option>--Select status--</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delieverd">Delieverd</option>
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

export default OrderUpdate;