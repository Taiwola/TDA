"use client";
import React from "react";
import { PopularProduct } from "./popularProduct";
import { CardSalesSummary } from "./CardSalesSummary";
import { PendingOrders } from "./pendingOrders";
import { QuickStats } from "./quickStats";

export const Dashboard = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-fr">
        {/* Full-width stats */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <QuickStats />
        </div>

        {/* Main content */}
        <div className="col-span-1 lg:col-span-2 row-span-2">
          <CardSalesSummary />
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2">
          <PendingOrders />
        </div>
        <div className="col-span-1 lg:col-span-2 row-span-2">
          <PopularProduct />
        </div>

        {/* Placeholder sections - replace with real components */}
        {/* <div className="col-span-1 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900">Placeholder 1</h2>
        </div>
        <div className="col-span-1 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900">Placeholder 2</h2>
        </div> */}
      </div>
    </div>
  );
};
