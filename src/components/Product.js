import React from 'react';
import styled from 'styled-components';
import { db } from '../services/Firebase';
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px; /* Add border-radius */
`;

const ProductTitle = styled.h2`
  /* Styling for the product title */
  font-size: 18px;
  margin: 10px 0;
  color: #333; /* Add color */
  text-decoration: none; /* Remove underline */
`;

const ProductPrice = styled.p`
  /* Styling for the product price */
  font-size: 16px;
  color: #666; /* Add color */
  margin-bottom: 10px; /* Add margin for spacing */
  text-decoration: none; /* Remove underline */
`;


const AddToCartButton = styled.button`
  /* Styling for the "Add to Cart" button */
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(to left, #99004d 0%, #ff0080 100%);
    letter-spacing: 1px;
  }
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
      <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
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
