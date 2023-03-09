import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Widget.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const Widget = ({ type }) => {
    const [dashboardProductDetails, setDashboardProductDetails] = useState({});
    const [dashboardOrderDetails, setDashboardOrderDetails] = useState({});
    const [dashboardCustomerDetails, setDashboardCustomerDetails] = useState({});

    useEffect(() => {
        getDashboardProductDetails();
    }, []);

    useEffect(() => {
        getDashboardOrderDetails();
    }, []);

    useEffect(() => {
        getDashboardCustomerDetails();
    }, []);

    const getDashboardProductDetails = async () => {
        try {
            let value = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/dashboard-totalproducts`
            );
            const { data } = value;
            setDashboardProductDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDashboardOrderDetails = async () => {
        try {
            let value = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/dashboard-totalorders`
            );
            const { data } = value;
            setDashboardOrderDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getDashboardCustomerDetails = async () => {
        try {
            let value = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/dashboard-totalcustomers`
            );
            const { data } = value;
            setDashboardCustomerDetails(data);
        } catch (error) {
            console.log(error);
        }
    };

    let data;

    switch (type) {
        case "user":
            data = {
                title: "CUSTOMERS",
                total: dashboardCustomerDetails.totalCustomers,
                link: (
                    <Link to="/customerlist" style={{ textDecoration: "none" }}>
                        See all customers
                    </Link>
                ),
                icon: (
                    <PersonOutlinedIcon
                        className="widget_icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "PRODUCTS",
                total: dashboardProductDetails.totalProducts,
                link: (
                    <Link to="/productlist" style={{ textDecoration: "none" }}>
                        View all products
                    </Link>
                ),
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="widget_icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "ORDERS",
                total: dashboardOrderDetails.totalOrders,
                link: (
                    <Link to="/orderlist" style={{ textDecoration: "none" }}>
                        View all orders
                    </Link>
                ),
                icon: (
                    <LocalShippingOutlinedIcon
                        className="widget_icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                title: "STOCKS",
                total: dashboardProductDetails.totalAvaliableStock,
                link: (
                    <Link to="/productlist" style={{ textDecoration: "none" }}>
                        See all stocks details
                    </Link>
                ),
                icon: (
                    <WarehouseOutlinedIcon
                        className="widget_icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="widget_titles">{data.title}</span>
                <span className="widget_counters">{data.total}</span>
                <span className="widget_links">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage"></div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;