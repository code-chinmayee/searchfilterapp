import React, { useState } from "react";
import "../App.css"; // correct relative path to App.css

const ProductCarousel = ({ products, itemsPerSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - itemsPerSlide : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= products.length - itemsPerSlide ? 0 : prev + 1
    );
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <div className="product-carousel-section">
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#8249;
        </button>

        <div className="carousel-wrapper">
          {visibleProducts.map((product) => (
            <div className="carousel-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
