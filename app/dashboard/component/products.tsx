/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Edit, Plus, TrashIcon } from "lucide-react";

// Interface for product data
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

// Dummy product data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    quantity: 50,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    quantity: 30,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    category: "Electronics",
    price: 49.99,
    quantity: 100,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    category: "Accessories",
    price: 39.99,
    quantity: 80,
    image: "https://via.placeholder.com/50",
  },
];

const initialCategories = ["Electronics", "Accessories", "Clothing", "Home"];

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Handle delete product
  const handleDelete = (id: GridRowId) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  // Handle save edited product
  const handleSave = () => {
    if (selectedProduct?.id) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
    } else {
      // Add new product
      setProducts([
        ...products,
        { ...selectedProduct!, id: products.length + 1 },
      ]);
    }
    setOpenProductDialog(false);
    setSelectedProduct(null);
  };

  // Handle add new category
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
    setOpenCategoryDialog(false);
  };

  // Handle filter by category
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  // Define columns for the Data Grid
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
      sortable: false,
      filterable: false,
    },
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "Quantity", headerName: "Quantity", type: "number", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row as Product)}
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
      {/* Filter by Category and Add Buttons */}
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <TextField
          select
          label="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          variant="outlined"
          style={{ width: 200 }}
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#AC7526", // Burnt gold outline
              },
              "&:hover fieldset": {
                borderColor: "#AC7526", // Burnt gold outline on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#AC7526", // Burnt gold outline when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#AC7526", // Burnt gold label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#AC7526", // Burnt gold label color when focused
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setOpenProductDialog(true)}
          sx={{
            backgroundColor: "#AC7526", // Burnt gold background
            color: "#FFFFFF", // White text
            "&:hover": {
              backgroundColor: "#8A5C1E", // Darker burnt gold on hover
            },
          }}
        >
          Add Product
        </Button>
        <Button
          variant="outlined"
          startIcon={<Plus />}
          onClick={() => setOpenCategoryDialog(true)}
          sx={{
            color: "#AC7526", // Burnt gold text color
            borderColor: "#AC7526", // Burnt gold outline color
            "&:hover": {
              backgroundColor: "#AC7526", // Burnt gold background on hover
              color: "#FFFFFF", // White text on hover
              borderColor: "#AC7526", // Burnt gold outline on hover
            },
          }}
        >
          Add Category
        </Button>
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={filteredProducts}
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

      {/* Add/Edit Product Dialog */}
      <Dialog
        open={openProductDialog}
        onClose={() => setOpenProductDialog(false)}
      >
        <DialogTitle>
          {selectedProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            value={selectedProduct?.name || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                name: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Category"
            value={selectedProduct?.category || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                category: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price"
            type="number"
            value={selectedProduct?.price || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                price: parseFloat(e.target.value),
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={selectedProduct?.quantity || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                quantity: parseInt(e.target.value),
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={selectedProduct?.image || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                image: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: "#AC7526", // Burnt gold background
              color: "#FFFFFF", // White text
              "&:hover": {
                backgroundColor: "#8A5C1E", // Darker burnt gold on hover
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddCategory}
            sx={{
              backgroundColor: "#AC7526", // Burnt gold background
              color: "#FFFFFF", // White text
              "&:hover": {
                backgroundColor: "#8A5C1E", // Darker burnt gold on hover
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
