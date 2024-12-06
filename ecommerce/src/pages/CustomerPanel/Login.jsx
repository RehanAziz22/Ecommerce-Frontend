import React, { useContext, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import NavbarComponent from '../../components/NavbarComponent';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate  = useNavigate()

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation
  const validateForm = () => {
    let errors = {};
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
      const response = await axios.post('http://localhost:3000/api/user/login', formData);
      console.log(response.data.data)
      if (response.data.status) {

        localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        setSuccessMessage('Login successful!');
        setUser(response.data.data)
        setError({});
        console.log('Response:', response.data);
        setFormData({
          email: '',
          password: '',
        });
        navigate('/');
      }

      // Clear form fields
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setSuccessMessage('');
      setError({ apiError: err.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <>
        <NavbarComponent/>
    <Grid container style={{ minHeight: '100vh' }}>
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

      {/* Login Form */}
      <Grid item xs={12} sm={6}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Paper elevation={3} style={{ padding: '30px', width: '400px' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>

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
                Login
              </Button>
            </form>
          </Paper>
        </Box>
      </Grid>
    </Grid>
                </>
  );
};

export default Login;
