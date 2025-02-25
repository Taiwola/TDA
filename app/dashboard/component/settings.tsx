"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { Edit } from "lucide-react";
import { styled } from "@mui/system";

// Styled component for the avatar container
const AvatarContainer = styled("div")({
  position: "relative",
  display: "inline-block",
  marginBottom: 16,
});

// Styled component for the edit icon overlay
const EditIconOverlay = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "50%",
  padding: 4,
});

// Define the type for user data
type User = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export const SettingsPage: React.FC = () => {
  // State for user data
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    image: "https://via.placeholder.com/150",
  });

  // State for form inputs
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>(user.image);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update user data
    setUser({
      name,
      email,
      password: password || user.password, // Keep old password if new one is not provided
      image,
    });
    alert("Profile updated successfully!");
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Settings
        </Typography>

        {/* Profile Picture */}
        <Box display="flex" justifyContent="center" mb={4}>
          <AvatarContainer>
            <Avatar src={image} alt={name} sx={{ width: 150, height: 150 }} />
            <EditIconOverlay>
              <IconButton component="label">
                <Edit />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </IconButton>
            </EditIconOverlay>
          </AvatarContainer>
        </Box>

        {/* Update Form */}
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
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#AC7526", // Burnt gold background
                color: "#FFFFFF", // White text
                "&:hover": {
                  backgroundColor: "#8A5C1E", // Darker burnt gold on hover
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
