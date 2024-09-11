import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAsync, fetchAsync , updateAsync} from './cartSlice';
// import styles from './Product.module.css';
import  './Cart.css'; 

export function Cart() {
  const items = useSelector(state=>state.cart.items);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAsync())
  },[])

  const handleChange = (e,id) =>
  {
    dispatch(updateAsync({id , change:{quantity: +e.target.value}}))
    console.log (e.target.value)
  }


  return (
    <div className='main-div'>
      <div className='products' >
       
      {
       items.map( (item) => ( 
          <div className="cart-item">
          <img src={item.image} alt={item.name} style={{width:"100%"}}/>

          <div className='description'>
            <p>{item.name}</p>
            <span>{item.brand} </span>
            <strong>{item.price} </strong>
          </div>

           <div className='quantity'>
            quantity
            <select value={item.quantity} onChange={(e)=>handleChange(e , item.id)} >
                <option value ={1}>{1} </option>
                <option value ={2}>{2} </option>
                <option value ={3}>{3} </option>
            </select>
          </div>

          <div className='close'>
            <button onClick={()=>dispatch(deleteAsync(item.id))}>X</button>
          </div>  
        </div>
       ))
      }
      </div>
      <h1>total : {items.reduce((acc,item) => item.price * item.quantity+acc , 0 )}</h1>
    </div>
  );
}
