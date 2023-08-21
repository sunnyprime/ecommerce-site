// components/ProductList.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link
import Product from './Product';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const products = [
  { id: 1, title: 'T-Shirt', price: 20, imageSrc: 'https://ychef.files.bbci.co.uk/1280x720/p0frq59q.jpg' },
  { id: 2, title: 'Shirt', price: 30, imageSrc: 'https://ychef.files.bbci.co.uk/1280x720/p0frq59q.jpg' },
  { id: 3, title: 'Jeans', price: 40, imageSrc: 'https://ychef.files.bbci.co.uk/1280x720/p0frq59q.jpg' },
  { id: 4, title: 'Trousers', price: 25, imageSrc: 'https://ychef.files.bbci.co.uk/1280x720/p0frq59q.jpg' },
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
