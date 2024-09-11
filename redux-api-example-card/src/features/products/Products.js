import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsync } from './productsSlice';
import {addAsync} from '../cart/cartSlice'
// import styles from './Product.module.css';
import  './Products.css'; 

export function Products() {
  const products = useSelector(state=>state.product.products);
  const dispatch = useDispatch();

useEffect(()=>{
    dispatch(fetchAsync())
  },[])

  return (
    <div className='main-div'>
      
      <div className='products' >
       
      {
       products.map( (product) => ( 
          <div className="card">
          <img src={product.image} alt={product.name} style={{width:"100%"}}/>
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>
          <p>{product.description}</p>
          <p><button onClick={()=>dispatch(addAsync(product))}>Add to Cart </button></p> 
        </div>
       )
       )
      }


        {/* <div className="card">
          <img src="https://www.w3schools.com/w3images/jeans3.jpg" alt="Denim Jeans" style={{width:"100%"}}/>
          <h1>Tailored Jeans</h1>
          <p className="price">$19.99</p>
          <p>Some text about the jeans..</p>
          <p><button>Add to Cart</button></p> 
        </div> */}
        
      </div>
    </div>
  );
}
