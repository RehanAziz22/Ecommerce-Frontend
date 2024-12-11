import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import NavbarComponent from "../../components/NavbarComponent";
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { user } = useContext(UserContext)
  const { setCartQty } = useContext(CartContext)
  const [isUser, setIsUser] = React.useState(JSON.parse(localStorage.getItem('currentUser')) || user)
  console.log(isUser)
  const [cartData, setCartData] = useState(null);


  const getCartProducts = ()=>{
    axios
      .get(`http://localhost:3000/api/cart/${isUser._id}`)
      .then((response) => setCartData(response.data.cart))
      .catch((error) => console.error("Error fetching cart data:", error));

  }
  useEffect(() => {
    // Fetch cart data from API
    getCartProducts();
  }, []);

  const clearCart = () => {

    axios
      .post(`http://localhost:3000/api/cart/clear`, { userId: isUser._id })
      .then((response) => { setCartData(response.data.cart); setCartQty(0) })
      .catch((error) => console.error("Error fetching cart data:", error));
  }

  const removeProduct = (productId) => {
    console.log(productId)
    axios.post(`http://localhost:3000/api/cart/remove`, {
      userId: isUser._id,
      productId
    })
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.cart.items);
          getCartProducts();

          setCartQty(response.data.cart.items.length);
        }
      }).catch((error) => console.error("Error removing product from cart:", error.response.data));
  }
  if (!cartData) return <Typography>Loading...</Typography>;
  

  return (
    <>
      <NavbarComponent />
      
      <Box sx={{ padding: 2, paddingTop: 10, maxWidth: "1200px", margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        <Grid container spacing={2}>
          {cartData.items.map((item) => (
            <Grid item xs={12} sm={4} md={3} key={item._id}>
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
                  <Button size="small" variant="outlined" color="secondary" onClick={() => { removeProduct(item.productId._id) }}>
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
        <Box sx={{ marginTop: 4 }}>
          <Button size="small" variant="outlined" color="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
