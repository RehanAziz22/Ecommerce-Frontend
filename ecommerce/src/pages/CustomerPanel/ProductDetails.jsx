import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Rating,
    Box,
    Button,
    Paper,
    Chip,
    Avatar,
    Divider,
    TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/product/${id}`)
            .then((response) => {
                const data = response.data.data;
                setProduct(data);
                setComments(data.reviews);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
                setLoading(false);
            });
    }, []);

    const handleAddComment = async () => {

        const newReview = {
            reviewerName: "Anonymous",
            reviewerEmail: "anonymous@example.com",
            rating: newRating,
            comment: newComment,
        };

        const response = await axios.post(
            `http://localhost:3000/api/product/${id}/reviews`,
            newReview
        );

        console.log(response);
        if (response.status === 200) {
            // Add the newly posted review to the comments array
            setComments((prevComments) => [response.data.review, ...prevComments]);
            setNewComment("");
            setNewRating(0);
        } else {
            console.error("Failed to add the review:", response.data);
        }

    };

    if (loading) {
        return <Typography variant="h4" align="center">Loading...</Typography>;
    }

    if (!product) {
        return <Typography variant="h4" align="center">Product not found.</Typography>;
    }

    return (
        <>
            <NavbarComponent />
            <Container maxWidth="lg" sx={{ mt: 12 }}>
                <Grid container spacing={4}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: "100%" }}>
                            <CardMedia
                                component="img"
                                image={product.images[0]}
                                alt={product.title}
                                sx={{ objectFit: "contain", height: "400px" }}
                            />
                        </Card>
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {product.title}
                            </Typography>
                            <Rating value={product.rating} readOnly precision={0.5} />
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                {product.description}
                            </Typography>
                            <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Discount: {product.discountPercentage}%
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Stock: {product.stock}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Weight: {product.weight} lbs
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Warranty: {product.warrantyInformation}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Shipping: {product.shippingInformation}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Return Policy: {product.returnPolicy}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Minimum Order Quantity: {product.minimumOrderQuantity}
                            </Typography>
                            <Chip label={`SKU: ${product.sku}`} color="secondary" sx={{ mt: 2 }} />
                            <Box sx={{ mt: 4 }}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Add to Cart
                                </Button>
                                <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
                                    Buy Now
                                </Button>
                            </Box>
                        </CardContent>
                    </Grid>
                </Grid>

                {/* Reviews and Add Comment Form */}
                <Grid container spacing={4} sx={{ mt: 6 }}>
                    {/* Reviews */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                            Customer Reviews
                        </Typography>
                        {comments.map((review) => (
                            <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar>{review.reviewerName[0]}</Avatar>
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="subtitle1">{review.reviewerName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(review.date).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Rating value={review.rating} readOnly precision={0.5} sx={{ mt: 1 }} />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {review.comment}
                                </Typography>
                            </Paper>
                        ))}

                        {/* Add Comment Form */}
                        <Paper sx={{ p: 2, mt: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Add a Review
                            </Typography>
                            <Rating
                                value={newRating}
                                onChange={(event, newValue) => setNewRating(newValue)}
                                precision={0.5}
                            />
                            <TextField
                                label="Your Comment"
                                fullWidth
                                multiline
                                rows={4}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddComment}
                                sx={{ mt: 2 }}
                                disabled={!newComment || newRating === 0}
                            >
                                Submit
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Ads Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" gutterBottom>
                            Sponsored Ads
                        </Typography>
                        <Paper sx={{ p: 2, mb: 2, textAlign: "center" }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Discount on Condiments!
                            </Typography>
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Ad"
                                style={{ width: "100%", borderRadius: 4 }}
                            />
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                Shop Now
                            </Button>
                        </Paper>
                        <Paper sx={{ p: 2, textAlign: "center" }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Free Shipping on Orders Over $50
                            </Typography>
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Ad"
                                style={{ width: "100%", borderRadius: 4 }}
                            />
                            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                                Learn More
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProductDetails;
