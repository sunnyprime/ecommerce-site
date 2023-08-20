// components/Product.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductCard = styled.div`
  /* Styling for the product card */
`;

const ProductImage = styled.img`
  /* Styling for the product image */
`;

const ProductTitle = styled.h2`
  /* Styling for the product title */
`;

const ProductPrice = styled.p`
  /* Styling for the product price */
`;

const Product = ({ imageSrc, title, price }) => {
  return (
    <ProductCard>
      <ProductImage src={imageSrc} alt={title} />
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>${price}</ProductPrice>
    </ProductCard>
  );
};

// Add PropTypes validation
Product.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
