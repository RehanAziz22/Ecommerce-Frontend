import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowCircleRight } from '@mui/icons-material';
import CarouselComponent from '../../components/CarouselComponent';
import NavbarComponent from '../../components/NavbarComponent';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    axios
      .get('http://localhost:3000/api/product')
      .then((response) => {
        if (response.data.status) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container sx={{ mt: 5 }}>
          <CarouselComponent />

          <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
            <CircularProgress size={45} />
          </Typography>
        </Container>
      </>
    );
  }

  // Categorize products
  const latestProducts = [...products].slice(-5); // Assume last 5 products are latest
  const inStockProducts = products.filter((product) => product.stock > 0);
  const categories = Array.from(new Set(products.map((product) => product.category)));

  const renderProductGrid = (productList, seeMoreLink) => (
    <>
      <Grid container spacing={4}>
        {productList.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.thumbnail || product.images[0]}
                alt={product.title}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description.slice(0, 60)}...
                </Typography>
                <Chip label={product.category} size="small" sx={{ mb: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Rating
                  name="read-only"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button size="small" color="secondary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", mt: 3 }} item xs={12} sm={6} md={4} lg={3} >
          <Box >
            <Button
              // variant="contained"
              color="primary"
              onClick={() => navigate(seeMoreLink)}
              sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}
            >
              See More<ArrowCircleRight />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );

  return (<>
    <NavbarComponent />
    <Container sx={{ mt: 5 }}>
      <CarouselComponent />
      {/* <Typography variant="h4" textAlign="center" sx={{ mb: 5 }}>
        Explore Our Products
      </Typography> */}
      {/* Latest Products Section */}
      <Box sx={{ mb: 5,mt:5 }}>
        <Typography variant="h5" gutterBottom>
          Latest Products
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {renderProductGrid(latestProducts, 'Latest', '/products/latest')}
      </Box>

      {/* In Stock Products Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          In Stock
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {renderProductGrid(inStockProducts, 'In Stock', '/products/in-stock')}
      </Box>

      {/* Products by Category */}
      {categories.map((category) => (
        <Box key={category} sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>
            {category.charAt(0).toUpperCase() + category.slice(1)} Products
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {renderProductGrid(
            products.filter((product) => product.category === category),
            category,
            `/products/category/${category}`
          )}
        </Box>
      ))}
    </Container>
  </>
  );
};

export default Home;
