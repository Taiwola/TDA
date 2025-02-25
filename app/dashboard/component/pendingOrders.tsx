import React from "react";

export const PendingOrders = () => {
  // Dummy data for pending orders
  const pendingOrders = [
    {
      id: 1,
      customer: "John Doe",
      items: 3,
      total: 149.99,
      status: "Processing",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: 5,
      total: 299.99,
      status: "Pending Payment",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      items: 2,
      total: 99.99,
      status: "Shipped",
    },
  ];

  return (
    <div
      className="row-span-3 xl:row-span-6 col-span-1 xl:col-span-2 bg-white shadow-md rounded-2xl p-5"
      style={{ color: "#000000" }} // Black text
    >
      <h2 className="text-lg font-semibold mb-4">Pending Orders</h2>

      {/* Order List */}
      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center p-4 rounded-lg"
            style={{ backgroundColor: "#F5F5F5" }} // Light gray background
          >
            {/* Customer and Items */}
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-gray-600">{order.items} items</p>
            </div>

            {/* Total and Status */}
            <div className="text-right">
              <p
                className="font-semibold"
                style={{ color: "#AC7526" }} // Burnt gold for total
              >
                ${order.total.toFixed(2)}
              </p>
              <p
                className="text-sm"
                style={{
                  color:
                    order.status === "Shipped"
                      ? "#10B981" // Green for shipped
                      : order.status === "Pending Payment"
                      ? "#EF4444" // Red for pending payment
                      : "#AC7526", // Burnt gold for processing
                }}
              >
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
