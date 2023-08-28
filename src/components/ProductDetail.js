import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import ProductDetail from './ProductDetail';
import styled from 'styled-components';
import PropTypes from 'prop-types'
// import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/firestore'; // Import Firestore module
import { db } from '../services/Firebase'; 

const DetailContainer = styled.div`
  display: flex;
  padding: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DetailImage = styled.img`
  max-width: 50%;
  height: auto;
  margin-right: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const DetailInfo = styled.div`
  flex: 1;
`;

const DetailTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
`;

const DetailPrice = styled.p`
  font-size: 22px;
  margin-bottom: 10px;
`;

const DetailDescription = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = db.collection('products').doc("NabD1d5dOHr4ylN4VwLu");
        const productDoc = await productRef.get();
        if (productDoc.exists) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          setProduct(productData);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <DetailContainer>
      <DetailImage src={product.imageUrl} alt={product.name} />
      <DetailInfo>
        <DetailTitle>{product.name}</DetailTitle>
        <DetailPrice>${product.price}</DetailPrice>
        <DetailDescription>{product.description}</DetailDescription>
      </DetailInfo>
    </DetailContainer>
  );
};

ProductDetail.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductDetail;
