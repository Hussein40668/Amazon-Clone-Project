import React from "react";
import styles from "./Carousel.module.css"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { imgList } from "./image/data";

const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          imgList?.map((imageItemLink) => {
          return <img src={imageItemLink} />;
        })
        }
      </Carousel>
      <div className={styles.hero_img}></div>
    </>
  );
};

export default CarouselEffect;
