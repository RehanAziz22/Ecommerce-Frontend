import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import NavbarComponent from "../../components/NavbarComponent";

const About = () => {
    return (
        <>
            <NavbarComponent />
            <Container maxWidth="lg" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <Grid container spacing={4}>
                    {/* Banner Section */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "400px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h3" style={{ fontWeight: "bold" }}>
                                About Us
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Intro Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 600 }}>
                            Welcome to NEXTBUY
                        </Typography>
                        <Typography variant="body1" paragraph>
                            At NEXTBUY,  we believe in bringing the finest products directly to your doorstep.
                            Our journey started with a simple idea — to make online shopping easy, enjoyable, and accessible
                            to everyone. With a commitment to quality and service, we have grown to become a trusted name
                            in the eCommerce industry.
                        </Typography>
                        <Typography variant="body1">
                            From fashion to electronics, and home essentials to luxury items, we curate a wide range
                            of products tailored to your needs. Our platform is designed to offer a seamless shopping experience,
                            with exclusive deals, secure payments, and fast delivery to ensure customer satisfaction every time.

                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Team"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            }}
                        />
                    </Grid>

                    {/* Values Section */}
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            style={{ fontWeight: 600, textAlign: "center", marginTop: "2rem" }}
                        >
                            What We Value
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "1rem",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Customer Satisfaction"
                                width={"250px"}
                                height={"250px"}
                                sx={{ marginBottom: "1rem", borderRadius: "50%" }}
                            />
                            <Typography variant="h6">Customer Satisfaction</Typography>
                            <Typography variant="body2">
                                We prioritize our customers shopping experience.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "1rem",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1493236272120-200db0da1927?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Quality Products"
                                width={"250px"}
                                height={"250px"}
                                sx={{ marginBottom: "1rem", borderRadius: "50%" }}
                            />
                            <Typography variant="h6">Quality Products</Typography>
                            <Typography variant="body2">
                                We handpick every item to ensure you get the best.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "1rem",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                            }}
                        >
                            <Box
                                component="img"
                                src="https://plus.unsplash.com/premium_photo-1682141929497-97402f35d45e?q=80&w=1787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Fast Delivery"
                                width={"250px"}
                                height={"250px"}

                                sx={{ marginBottom: "1rem", borderRadius: "50%" }}
                            />
                            <Typography variant="h6">Fast Delivery</Typography>
                            <Typography variant="body2">
                                Quick and reliable delivery services worldwide.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Call to Action */}
                    <Grid item xs={12} style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Typography variant="h5" gutterBottom>
                            Join Our Community Today!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginTop: "1rem" }}
                        >
                            Shop Now
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default About;
