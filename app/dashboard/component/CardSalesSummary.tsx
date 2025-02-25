"use client";
import React, { Suspense, useState } from "react";
import { SpinnerLoader } from "./spinnerLoader";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Generate dummy sales data
const generateSalesData = (timeFrame: string) => {
  const data = [];
  const today = new Date();
  //   const daysInMonth = new Date(
  //     today.getFullYear(),
  //     today.getMonth() + 1,
  //     0
  //   ).getDate();

  switch (timeFrame) {
    case "daily":
      // Generate data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({
          date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
          totalValue: Math.floor(Math.random() * 1000000) + 500000, // Random value between 500,000 and 1,500,000
        });
      }
      break;

    case "weekly":
      // Generate data for the last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i * 7);
        data.push({
          date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
          totalValue: Math.floor(Math.random() * 3000000) + 2000000, // Random value between 2,000,000 and 5,000,000
        });
      }
      break;

    case "monthly":
      // Generate data for the last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        data.push({
          date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
          totalValue: Math.floor(Math.random() * 5000000) + 3000000, // Random value between 3,000,000 and 8,000,000
        });
      }
      break;

    default:
      break;
  }

  return data;
};

export const CardSalesSummary = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const salesData = generateSalesData(timeFrame); // Generate dummy data based on the selected time frame

  const highestValueData = salesData.reduce((arr, curr) => {
    return arr.totalValue > curr.totalValue ? arr : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      <Suspense fallback={<SpinnerLoader />}>
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
            Sales summary
          </h2>
        </div>

        <hr />

        {/* Body */}
        <div>
          <div className="flex justify-between items-center mb-6 px-7 mt-3">
            <div className="text-lg font-medium">
              <p className="text-xs text-gray-400">value</p>
              <span className="text-2xl font-extrabold">
                {salesData
                  .reduce((sum, item) => sum + item.totalValue, 0)
                  .toLocaleString("en")}
              </span>
              <span className="text-green-500 ml-2 text-sm">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                100%
              </span>
            </div>
            <select
              className="shadow-sm border-gray-300 bg-white p-2 rounded"
              value={timeFrame}
              onChange={(e) => {
                setTimeFrame(e.target.value);
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={350} className="px-7">
            <BarChart
              data={salesData}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray={""} vertical={false} />
              <XAxis
                dataKey={"date"}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 12, dx: -1 }}
                tickFormatter={(value) => {
                  return `${(value / 1000000).toFixed()}M`; // Format as millions
                }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString("en")}`,
                ]}
              />
              <Bar
                dataKey={"totalValue"}
                fill="#AC7526"
                barSize={10}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <hr />
          <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
            <p>{salesData.length || 0} days</p>
            <p className="text-sm">
              Highest Sales Date:{" "}
              <span className="font-bold text-burntgold">
                {highestValueDate}
              </span>
            </p>
          </div>
        </div>
      </Suspense>
    </div>
  );
};
