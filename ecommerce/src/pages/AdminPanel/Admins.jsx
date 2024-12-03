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
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications
import CreateAdmin from "./CreateAdmin";

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [createAdmin, setCreateAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedAdmin, setSearchedAdmin] = useState(null);

  // Fetch admins from the API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin");
        if (response.data.status) {
          setAdmins(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
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
      setSearchedAdmin(null); // Clear the previous search result
      return;
    }

    const foundAdmin = admins.find((admin) => admin.email === searchEmail);

    if (foundAdmin) {
      setSearchedAdmin(foundAdmin);
      toast.success("Admin found!");
    } else {
      toast.error("Admin not found.");
      setSearchedAdmin(null);
    }
  };

  // Reset search
  const handleResetSearch = () => {
    setSearchEmail("");
    setSearchedAdmin(null);
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

    <Grid p={2} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
     
        <Box sx={{ textAlign: "right",mb:2 }}>
          {createAdmin ? <Button color="black" variant="text" onClick={() => setCreateAdmin(!createAdmin)}>Show Admins</Button>
            : <Button color="black" variant="text" onClick={() => setCreateAdmin(!createAdmin)}>Create Admin</Button>}
        </Box>

        {!createAdmin ?
          <Paper elevation={3} style={{ padding: '30px', width: { xs: '400px', md: "500px", lg: "700px" },minHeight:"80vh" }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#333", mb: 4 }}
            >
              Admin List
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

            {/* Searched Admin Details */}
            {searchedAdmin && (
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
                      <TableCell>{searchedAdmin.firstName}</TableCell>
                      <TableCell>{searchedAdmin.lastName}</TableCell>
                      <TableCell>{searchedAdmin.email}</TableCell>
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

            {/* Admin Table */}
            <TableContainer component={Paper} sx={{ maxWidth: 900, mx: "auto",backgroundColor:"whitesmoke" }}>
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
                  {admins.map((admin, index) => (
                    <TableRow key={admin._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{admin.firstName}</TableCell>
                      <TableCell>{admin.lastName}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Toast Container */}
            <ToastContainer />
          </Paper> : <CreateAdmin />
        }
    </Grid>
  );
}
