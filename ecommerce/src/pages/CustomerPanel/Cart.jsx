import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import NavbarComponent from "../../components/NavbarComponent";

const Cart = () => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    // Fetch cart data from API
    axios
      .get("http://localhost:3000/api/cart/6746f6526c3984bd2e15aa1f")
      .then((response) => setCartData(response.data.cart))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  if (!cartData) return <Typography>Loading...</Typography>;

  return (
    <>
    <NavbarComponent/>
    <Box sx={{ padding: 2,marginTop:6, maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      <Grid container spacing={2}>
        {cartData.items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.productId.thumbnail}
                alt={item.productId.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.productId.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.productId.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Price: ${item.productId.price.toFixed(2)}
                </Typography>
                <Typography variant="body1">Quantity: {item.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  View Details
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Total Price: ${cartData.totalPrice.toFixed(2)}</Typography>
      </Box>
    </Box>
    </>
  );
};

export default Cart;
