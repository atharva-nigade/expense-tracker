"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartGraph = ({ data }) => {
  return (
    <div className="p-5 rounded shadow-md bg-slate-100">
      {/* Wrap the BarChart inside the ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#618264" />
          <Bar dataKey="amount" stackId="a" fill="#79AC78" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartGraph;
