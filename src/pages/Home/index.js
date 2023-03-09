import React from "react";
import Charts from "../../components/Charts";
import Featured from "../../components/Featured";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TableList from "../../components/Table";
import Widget from "../../components/Widget";
import "./Home.css";

const index = () => {
    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="widgets">
                        <Widget type="user" />
                        <Widget type="order" />
                        <Widget type="earning" />
                        <Widget type="balance" />
                    </div>
                    <div className="charts">
                        <Featured />
                        <Charts />
                    </div>
                    <div className="listContainer">
                        <div className="listTitle">Recent Orders</div>
                        <TableList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;