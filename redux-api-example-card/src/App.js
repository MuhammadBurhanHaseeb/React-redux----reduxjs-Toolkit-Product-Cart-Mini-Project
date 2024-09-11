import React, { useState } from 'react';
import logo from './logo.svg';
import { Products } from './features/products/Products.js';
import {Cart} from './features/cart/Cart.js';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const [showCart , setShowCart] =useState(false);
  const items = useSelector(state=>state.cart.items);

  return (
    <div className="App">
      <button onClick={()=> setShowCart(!showCart)}>[Cart!!]</button>
     {showCart ? <Cart/> : <Products/>}

    </div>
  );
}

export default App;
