import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const ProductDetail = ({
  title = 'Jeans',
  price = '20',
  imageSrc = 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691039436_8510643.jpg?format=webp&w=300&dpr=1.3',
  description = "Upgrade your style with these trendy denim jeans. Crafted from high-quality denim fabric, these jeans offer both comfort and style. The slim-fit design provides a modern and sleek look, perfect for casual outings and gatherings. The classic blue color makes them versatile to pair with any top or shirt. Whether you're going for a casual look or dressing up for a night out, these jeans are a must-have in your wardrobe.",
}) => {
  return (
    <DetailContainer>
      <DetailImage src={imageSrc} alt={title} />
      <DetailInfo>
        <DetailTitle>{title}</DetailTitle>
        <DetailPrice>${price}</DetailPrice>
        <DetailDescription>{description}</DetailDescription>
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
