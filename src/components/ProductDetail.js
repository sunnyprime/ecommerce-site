// components/ProductDetail.js
import React from 'react';
import PropTypes from 'prop-types';

const ProductDetail = ({ title, price, imageSrc }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>${price}</p>
      <img src={imageSrc} alt={title} />
    </div>
  );
};

ProductDetail.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default ProductDetail;
