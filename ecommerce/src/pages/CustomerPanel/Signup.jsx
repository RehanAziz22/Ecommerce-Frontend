import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import NavbarComponent from '../../components/NavbarComponent';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation
  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6)
      errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', formData);

      // On success, save user data to localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      setSuccessMessage('Signup successful!');
      setError({});
      console.log('Response:', response.data);

      // Clear form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setSuccessMessage('');
      setError({ apiError: err.response?.data?.message || 'Signup failed' });
    }
  };

  return (
    <>
      <NavbarComponent />
      <Grid container style={{ minHeight: '90vh' }}>
        {/* Side Section */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: {
              xs: 'none',
              sm: 'flex'
            },
            backgroundColor: '#000',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" align="center" style={{ fontWeight: 600 }}>
            Welcome to Our Platform
          </Typography>
        </Grid>

        {/* Signup Form */}
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Paper elevation={3} style={{ padding: '30px', width: '400px' }}>
              <Typography variant="h4" align="center" gutterBottom>
                Signup
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!error.firstName}
                  helperText={error.firstName}
                  variant="outlined"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!error.lastName}
                  helperText={error.lastName}
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!error.email}
                  helperText={error.email}
                  variant="outlined"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!error.password}
                  helperText={error.password}
                  variant="outlined"
                />
                {error.apiError && <Typography color="error">{error.apiError}</Typography>}
                {successMessage && <Typography color="success">{successMessage}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '20px',
                    border: '1px solid black',
                  }}
                >
                  Signup
                </Button>
              </form>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
