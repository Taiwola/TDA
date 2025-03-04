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
      date: "2025-02-25",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: 5,
      total: 299.99,
      status: "Pending Payment",
      date: "2025-02-24",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      items: 2,
      total: 99.99,
      status: "Shipped",
      date: "2025-02-23",
    },
  ];

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "bg-emerald-100 text-emerald-800";
      case "Pending Payment":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div className="col-span-1 xl:col-span-2 row-span-3 xl:row-span-6 bg-white shadow-lg rounded-2xl p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Pending Orders
      </h2>

      {/* Orders Container */}
      <div className="space-y-4 max-h-[calc(100%-2rem)] overflow-y-auto">
        {pendingOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No pending orders at the moment
          </p>
        ) : (
          pendingOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
            >
              {/* Left Section - Customer Info */}
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{order.customer}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{order.items} items</span>
                  <span>•</span>
                  <span>{order.date}</span>
                </div>
              </div>

              {/* Right Section - Total and Status */}
              <div className="mt-2 sm:mt-0 flex items-center gap-4">
                <p className="font-semibold text-amber-700">
                  ${order.total.toFixed(2)}
                </p>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
