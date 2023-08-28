import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link
import Product from './Product';
import { db } from '../services/Firebase'; 

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

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f0f0f0;
  padding: 10px;
  margin-bottom:20px;
`;

const CategoryButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch products from Firebase
    const fetchProducts = async () => {
      try {
        const productsCollection = await db.collection('products').get();
        const productsData = productsCollection.docs.map(doc => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  console.log("PRODUCT:",products);

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.type === selectedCategory);
  return (
    <div>
      <Navbar>
        <CategoryButton onClick={() => handleCategoryClick('all')}>
          All
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick('shirt')}>
          Shirt
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick('t-shirt')}>
          T-Shirt
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick('jeans')}>
          Jeans
        </CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick('trousers')}>
          Trousers
        </CategoryButton>
      </Navbar>
      <ProductGrid>
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Product
              title={product.title}
              price={product.price}
              imageSrc={product.imageUrl}
            />
          </Link>
        ))}
      </ProductGrid>
    </div>
  );
};

export default ProductList;
