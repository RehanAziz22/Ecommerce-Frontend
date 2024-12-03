import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        if (response.data.status) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Search handler
  const handleSearch = () => {
    if (!isValidEmail(searchEmail)) {
      toast.error("Please enter a valid email address.");
      setSearchedUser(null); // Clear the previous search result
      return;
    }

    const foundUser = users.find((user) => user.email === searchEmail);

    if (foundUser) {
      setSearchedUser(foundUser);
      toast.success("User found!");
    } else {
      toast.error("User not found.");
      setSearchedUser(null);
    }
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchEmail("");
    setSearchedUser(null);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#333", mb: 4 }}
      >
        User List
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <TextField
          label="Search by Email"
          variant="outlined"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSearch}
          disabled={!searchEmail.trim()}
        >
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleResetSearch}>
          Reset
        </Button>
      </Box>

      {/* Searched User Details */}
      {searchedUser && (
        <Box
          p={2}
          mb={4}
          component={Paper}
          elevation={3}
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          <Typography variant="h6" gutterBottom>
            Search Result
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{searchedUser.firstName}</TableCell>
                <TableCell>{searchedUser.lastName}</TableCell>
                <TableCell>{searchedUser.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )}

      {/* User Table */}
      <TableContainer component={Paper} sx={{ maxWidth: 900, mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
}
