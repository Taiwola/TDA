"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Define the type for user data
type User = {
  name: string;
  email: string;
  password: string;
};

export const SettingsPage: React.FC = () => {
  // State for user data
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // Initial password
  });

  // State for form inputs
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);

  // State for password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Handle form submission for name and email
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
    });
    alert("Profile updated successfully!");
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    setUser({
      ...user,
      password: newPassword,
    });
    setNewPassword("");
    setConfirmPassword("");
    setOpenPasswordDialog(false);
    alert("Password updated successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Settings
        </Typography>

        {/* Update Form for Name and Email */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            fullWidth
            margin="normal"
            required
          />
          <Box mt={2} display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#AC7526",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#8A5C1E",
                },
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenPasswordDialog(true)}
              sx={{
                color: "#AC7526",
                borderColor: "#AC7526",
                "&:hover": {
                  backgroundColor: "#AC7526",
                  color: "#FFFFFF",
                  borderColor: "#AC7526",
                },
              }}
            >
              Change Password
            </Button>
          </Box>
        </form>

        {/* Change Password Dialog */}
        <Dialog
          open={openPasswordDialog}
          onClose={() => setOpenPasswordDialog(false)}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              fullWidth
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
            <Button
              onClick={handlePasswordChange}
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
      </Box>
    </Container>
  );
};
