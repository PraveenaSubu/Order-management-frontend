import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <>
            <div className="sidebar">
                <div className="top">
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <span className="logo">Orderhive </span>
                    </Link>
                </div>
                <hr />
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <li>
                            <DashboardIcon className="icon" />
                            <Link to="/home" style={{ textDecoration: "none" }}>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <p className="title">LISTS</p>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <Link to="/customerlist" style={{ textDecoration: "none" }}>
                                <span>Customers</span>
                            </Link>
                        </li>
                        <li>
                            <StoreIcon className="icon" />
                            <Link to="/productlist" style={{ textDecoration: "none" }}>
                                <span>Products</span>
                            </Link>
                        </li>
                        <li>
                            <CreditCardIcon className="icon" />
                            <Link to="/orderlist" style={{ textDecoration: "none" }}>
                                <span>Orders</span>
                            </Link>
                        </li>
                        <p className="title">USER</p>
                        <li>
                            <ExitToAppIcon className="icon" onClick={handleSignout} />
                            <span onClick={handleSignout}>Logout</span>
                        </li>
                    </ul>
                </div>
                <div className="bottom"></div>
            </div>
        </>
    );
};

export default Sidebar;