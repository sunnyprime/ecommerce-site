const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyB7S3b9gH2TwoVDz9DkQYe5YH9i7MntYHg",
  authDomain: "gpt-ecommerce-32522.firebaseapp.com",
  projectId: "gpt-ecommerce-32522",
  storageBucket: "gpt-ecommerce-32522.appspot.com",
  messagingSenderId: "266904137157",
  appId: "1:266904137157:web:be5d4b968eb24ad9a6efac",
  measurementId: "G-9J3D9WR5T0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const products = [
    {
        name: 'Jeans Product 1',
        price: 49.99,
        description: 'A stylish pair of jeans.',
        type: 'jeans',
        imageUrl: 'https://rockstarjeans.com/cdn/shop/files/RDG0180_5_6f49485b-eb16-453e-8ddd-4012c36441f0_1200x.jpg?v=1690186455',
      },
      {
        name: 'Jeans Product 2',
        price: 59.99,
        description: 'Comfortable jeans for everyday wear.',
        type: 'jeans',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0555/4451/2817/files/RDG0074_2_43222acb-364e-4c13-87ae-baa333a201a4_900x.jpg?v=1690186872',
      },
      {
        name: 'Jeans Product 3',
        price: 69.99,
        description: 'Classic denim jeans.',
        type: 'jeans',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0555/4451/2817/files/RDG0070_2_f9e6957f-bc62-463d-8bd2-926c951895cf_900x.jpg?v=1690186789',
      },
      {
        name: 'Jeans Product 4',
        price: 79.99,
        description: 'Fashionable jeans with a unique design.',
        type: 'jeans',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0555/4451/2817/files/RDG0080_2_3e78ca14-d67d-4705-8bc7-05b6393436b4_900x.jpg?v=1690186909',
      },
      {
        name: 'Jeans Product 5',
        price: 89.99,
        description: 'Premium quality denim jeans.',
        type: 'jeans',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0555/4451/2817/files/RDG0035_2_e916c53c-c085-478b-bcfc-e1539f3c5dcd_900x.jpg?v=1690186766',
      },
      // Add more jeans products
    
      // Shirt
      {
        name: 'Shirt Product 1',
        price: 29.99,
        description: 'A comfortable shirt for any occasion.',
        type: 'shirt',
        imageUrl: 'https://d4kuloxg8pkbr.cloudfront.net/media/catalog/product/cache/dd0f1f9b707d425fb8871468a820dcef/2/_/2_mfs-13764-q-17-olive_1.jpg',
      },
      // ... Add more shirt products
    
      // T-Shirt
      {
        name: 'T-Shirt Product 1',
        price: 19.99,
        description: 'A trendy t-shirt for casual wear.',
        type: 'tshirt',
        imageUrl: 'https://standoutforever.com/cdn/shop/products/1_01251302-a59f-4fe9-b6f2-e300862e7819_720x.jpg?v=1596038101',
      },
      // ... Add more t-shirt products
    
      // Trousers
      {
        name: 'Trousers Product 1',
        price: 39.99,
        description: 'Formal trousers for a professional look.',
        type: 'trousers',
        imageUrl: 'https://images.meesho.com/images/products/67905727/6nnqg_512.webp',
      },
];

const addProductsToDatabase = async () => {
  for (const product of products) {
    await db.collection('products').doc(product.id).set(product);
  }
  console.log('Products added to the database.');
};

const getProductsFromDatabase = async () => {
  const productsSnapshot = await db.collection('products').get();
  const productsData = [];
  productsSnapshot.forEach((doc) => {
    productsData.push(doc.data());
  });
  console.log('Products retrieved from the database:', productsData);
};

// Run the functions to add and retrieve products
addProductsToDatabase().then(() => {
  getProductsFromDatabase().then(() => {
    firebase.app().delete(); // Close the Firebase app connection
  });
});
