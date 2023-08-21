// components/Cart.js
import React, { useState, useEffect } from 'react';
import {db} from '../services/Firebase';
import 'firebase/firestore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // const db = firebase.firestore();
    const unsubscribe = db.collection('cartItems').onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(items);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const removeFromCart = (id) => {
    const db = firebase.firestore();
    db.collection('cartItems').doc(id).delete();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
