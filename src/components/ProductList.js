import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link
import Product from './Product';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* Display two columns */
  gap: 70px;
  padding: 0px 60px;

  @media (max-width: 768px) {
    /* Display one column when width is less than 768px */
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 40px;
    padding: 0px 20px;
  }
`;

const products = [
  { id: 1, title: 'T-Shirt', price: 20, imageSrc: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1657172777_8557030.jpg?w=480&dpr=1.3' },
  { id: 2, title: 'Shirt', price: 30, imageSrc: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691049796_1191812.jpg?format=webp&w=300&dpr=1.3' },
  { id: 3, title: 'Jeans', price: 40, imageSrc: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691039436_8510643.jpg?format=webp&w=300&dpr=1.3' },
  { id: 4, title: 'Trousers', price: 25, imageSrc: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691838303_1450131.jpg?format=webp&w=300&dpr=1.3' },
  // Add more products as needed
];

const ProductList = () => {
  return (
    <ProductGrid>
      {products.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <Product
            title={product.title}
            price={product.price}
            imageSrc={product.imageSrc}
          />
        </Link>
      ))}
    </ProductGrid>
  );
};

export default ProductList;
