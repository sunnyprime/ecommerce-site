// components/Product.js
import React from 'react';
import styled from 'styled-components';
import {db} from '../services/Firebase';
import 'firebase/firestore';
import PropTypes from 'prop-types'; // Import PropTypes

const ProductCard = styled.div`
  /* Styling for the product card */
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  /* Styling for the product image */
  width: 100%; /* Adjust container width */
  height: 100%; /* Adjust container height */
  object-fit: cover; /* Preserve aspect ratio and cover the container */

  @media (max-width: 768px) {
    /* Adjust image styles for smaller screens */
    width: 100%;
    height: auto;
  }
`;

const ProductTitle = styled.h2`
  /* Styling for the product title */
`;

const ProductPrice = styled.p`
  /* Styling for the product price */
`;

const Product = ({ imageSrc, title, price }) => {
    const addToCart = () => {
        console.log('Adding to cart:', title, price);
        db.collection('cartItems')
          .add({
            title,
            price,
          })
          .then(() => {
            console.log('Data added to Firestore successfully');
          })
          .catch(error => {
            console.error('Error adding data to Firestore:', error);
          });
      };
  return (
    <ProductCard>
      <ProductImage src={imageSrc} alt={title} />
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>${price}</ProductPrice>
      <button onClick={addToCart}>Add to Cart</button>
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
