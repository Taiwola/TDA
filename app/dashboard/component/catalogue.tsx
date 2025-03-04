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
} from "@mui/material";
import { Edit, Plus, TrashIcon } from "lucide-react";

// Interface for catalog item data
interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Dummy catalog data
const initialCatalog: CatalogItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless audio",
    price: 99.99,
    stock: 50,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracking smartwatch",
    price: 199.99,
    stock: 30,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse",
    price: 49.99,
    stock: 100,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    description: "Durable backpack for laptops",
    price: 39.99,
    stock: 80,
  },
];

export const CatalogPage = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>(initialCatalog);
  const [openCatalogDialog, setOpenCatalogDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  // Handle delete catalog item
  const handleDelete = (id: GridRowId) => {
    setCatalog(catalog.filter((item) => item.id !== id));
  };

  // Handle edit catalog item
  const handleEdit = (item: CatalogItem) => {
    setSelectedItem(item);
    setOpenCatalogDialog(true);
  };

  // Handle save edited/new catalog item
  const handleSave = () => {
    if (selectedItem?.id) {
      // Update existing item
      setCatalog(
        catalog.map((item) =>
          item.id === selectedItem.id ? selectedItem : item
        )
      );
    } else {
      // Add new item
      setCatalog([...catalog, { ...selectedItem!, id: catalog.length + 1 }]);
    }
    setOpenCatalogDialog(false);
    setSelectedItem(null);
  };

  // Define columns for the Data Grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "stock", headerName: "Stock", type: "number", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row as CatalogItem)}
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
      {/* Add Button */}
      <div style={{ marginBottom: 16 }}>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setOpenCatalogDialog(true)}
          sx={{
            backgroundColor: "#AC7526",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#8A5C1E",
            },
          }}
        >
          Add Catalog Item
        </Button>
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={catalog}
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

      {/* Add/Edit Catalog Item Dialog */}
      <Dialog
        open={openCatalogDialog}
        onClose={() => setOpenCatalogDialog(false)}
      >
        <DialogTitle>
          {selectedItem ? "Edit Catalog Item" : "Add Catalog Item"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              value={selectedItem?.name || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem!,
                  name: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={selectedItem?.description || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem!,
                  description: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={selectedItem?.price || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem!,
                  price: parseFloat(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              type="number"
              value={selectedItem?.stock || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem!,
                  stock: parseInt(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCatalogDialog(false)}>Cancel</Button>
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
