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

// Interface for user data
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

// Dummy user data
const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "admin" },
];

const roles = ["admin", "user"] as const;

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("");

  // Handle delete user
  const handleDelete = (id: GridRowId) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle edit user
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  // Handle save edited/new user
  const handleSave = () => {
    if (selectedUser?.id) {
      // Update existing user
      setUsers(
        users.map((user) => (user.id === selectedUser.id ? selectedUser : user))
      );
    } else {
      // Add new user
      setUsers([...users, { ...selectedUser!, id: users.length + 1 }]);
    }
    setOpenUserDialog(false);
    setSelectedUser(null);
  };

  // Handle filter by role
  const filteredUsers = roleFilter
    ? users.filter((user) => user.role === roleFilter)
    : users;

  // Define columns for the Data Grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row as User)}
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
      {/* Filter by Role and Add Button */}
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <TextField
          select
          label="Filter by Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
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
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setOpenUserDialog(true)}
          sx={{
            backgroundColor: "#AC7526",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#8A5C1E",
            },
          }}
        >
          Add User
        </Button>
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={filteredUsers}
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

      {/* Add/Edit User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              value={selectedUser?.name || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser!,
                  name: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={selectedUser?.email || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser!,
                  email: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Role"
              value={selectedUser?.role || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser!,
                  role: e.target.value as "admin" | "user",
                })
              }
              fullWidth
              margin="normal"
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
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
