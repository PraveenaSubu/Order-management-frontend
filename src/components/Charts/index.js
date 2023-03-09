import React from "react";
import "./Charts.css";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "July", Total: 1230000 },
    { name: "August", Total: 1950000 },
    { name: "September ", Total: 800000 },
    { name: "October", Total: 1600000 },
    { name: "November", Total: 900000 },
    { name: "December ", Total: 1700000 },
];

const Charts = () => {
    return (
        <>
            <div className="chart">
                <div className="chart_title">Last 6 Months (Revenue)</div>
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <AreaChart
                        width={730}
                        height={250}
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="gray" />
                        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="Total"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#total)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Charts;