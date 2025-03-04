/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Plus, TrashIcon } from "lucide-react";

// Interface for order data
interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  total: number;
  status: "pending" | "processing" | "delivered";
}

// Dummy order data
const initialOrders: Order[] = [
  {
    id: 1,
    customerName: "John Doe",
    orderDate: "2025-02-20",
    total: 99.99,
    status: "pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    orderDate: "2025-02-21",
    total: 199.99,
    status: "processing",
  },
  {
    id: 3,
    customerName: "Bob Johnson",
    orderDate: "2025-02-22",
    total: 49.99,
    status: "delivered",
  },
  {
    id: 4,
    customerName: "Alice Brown",
    orderDate: "2025-02-23",
    total: 39.99,
    status: "pending",
  },
];

const statuses = ["pending", "processing", "delivered"] as const;

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Handle delete order
  const handleDelete = (id: GridRowId) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Handle edit order
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setOpenOrderDialog(true);
  };

  // Handle save edited/new order
  const handleSave = () => {
    if (selectedOrder?.id) {
      // Update existing order
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id ? selectedOrder : order
        )
      );
    } else {
      // Add new order
      setOrders([...orders, { ...selectedOrder!, id: orders.length + 1 }]);
    }
    setOpenOrderDialog(false);
    setSelectedOrder(null);
  };

  // Handle filter by status
  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  // Define columns for the Data Grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 100 },
    { field: "customerName", headerName: "Customer", width: 200 },
    { field: "orderDate", headerName: "Order Date", width: 150 },
    { field: "total", headerName: "Total", type: "number", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row as Order)}
        />,
        <GridActionsCellItem
          icon={<TrashIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* Filter by Status and Add Button */}
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="outlined"
          style={{ width: 200 }}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#AC7526",
              },
              "&:hover fieldset": {
                borderColor: "#AC7526",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#AC7526",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#AC7526",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#AC7526",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setOpenOrderDialog(true)}
          sx={{
            backgroundColor: "#AC7526",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#8A5C1E",
            },
          }}
        >
          Add Order
        </Button>
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={filteredOrders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {/* Add/Edit Order Dialog */}
      <Dialog open={openOrderDialog} onClose={() => setOpenOrderDialog(false)}>
        <DialogTitle>{selectedOrder ? "Edit Order" : "Add Order"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Customer Name"
              value={selectedOrder?.customerName || ""}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder!,
                  customerName: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order Date"
              type="date"
              value={selectedOrder?.orderDate || ""}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder!,
                  orderDate: e.target.value,
                })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Total"
              type="number"
              value={selectedOrder?.total || ""}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder!,
                  total: parseFloat(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Status"
              value={selectedOrder?.status || ""}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder!,
                  status: e.target.value as
                    | "pending"
                    | "processing"
                    | "delivered",
                })
              }
              fullWidth
              margin="normal"
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOrderDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: "#AC7526",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#8A5C1E",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
