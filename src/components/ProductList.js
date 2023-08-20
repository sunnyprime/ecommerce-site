// components/ProductList.js
import React from 'react';
import styled from 'styled-components';
import Product from './Product';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const products = [
  { id: 1, title: 'T-Shirt', price: 20, imageSrc: 'tshirt.jpg' },
  { id: 2, title: 'Shirt', price: 30, imageSrc: 'shirt.jpg' },
  { id: 3, title: 'Jeans', price: 40, imageSrc: 'jeans.jpg' },
  { id: 4, title: 'Trousers', price: 25, imageSrc: 'trousers.jpg' },
  // Add more products as needed
];

const ProductList = () => {
  return (
    <ProductGrid>
      {products.map(product => (
        <Product
          key={product.id}
          title={product.title}
          price={product.price}
          imageSrc={product.imageSrc}
        />
      ))}
    </ProductGrid>
  );
};

export default ProductList;
