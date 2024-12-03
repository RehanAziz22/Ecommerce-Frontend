import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselImg1 from '../assets/black_friday.png';
import CarouselImg2 from '../assets/Furniture_sale.png';
import CarouselImg3 from '../assets/perfume_sale.png';

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      id: 1,
      image: CarouselImg1,
    },
    {
      id: 2,
      image: CarouselImg2,
    },
    {
      id: 3,
      image: CarouselImg3,
    },
  ];

  return (
    <Box sx={{ maxWidth: "100%", margin: "auto",marginTop:10 }}>
      <Slider {...settings}>
        {slides.map((slide) => (
        <img src={slide.image} loading="lazy" alt="" />
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselComponent;
