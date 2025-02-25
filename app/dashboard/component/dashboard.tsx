"use client";
import React from "react";
import { PopularProduct } from "./popularProduct";
import { CardSalesSummary } from "./CardSalesSummary";
import { PendingOrders } from "./pendingOrders";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 overflow-auto gap-10 pb-4 custom-grid-rows">
      <PopularProduct />
      <CardSalesSummary />
      <PendingOrders />
      <div className="row-span-2 xl:row-span-3 col-span-1 xl:col-span-2 bg-gray-500"></div>
      <div className="row-span-3 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
    </div>
  );
};
