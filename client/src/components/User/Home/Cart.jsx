// import React from 'react'
// import './Cart.css'


// const Cart = () => {
//   return (
//     <> 
    
//     <div className='order-header'> Added Items </div>
//     <br/>

//     <div > 
//       <table className='styled-table'> 
//         <tr> 
//           <th> Item </th>
//           <th> Price </th>
//           <th> Quantity </th>
//           <th> Total Price </th>
//           <th> Action </th>
//         </tr>
//         <tr> 
//           <td> Chicken Biriyani </td>
//           <td> ₹60 </td>
//           <td> 2 </td>
//           <td> ₹120 </td>
//           <td> Delete </td>
//         </tr>
//       </table>
//       <div className='cart-checkout'>
//         <button style={{display:'flex', justifyContent:'center'}}> Checkout to Payment</button> </div>
//     </div>
//     </>
    
//   )
// }

// export default Cart






import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemoveFromCart = (itemName) => {
    // Remove the item from the state and localStorage
    const updatedItems = cartItems.filter(item => item.name !== itemName);
    setCartItems(updatedItems);

    // Update localStorage after removal
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <>
      <div className='order-header'>Added Items</div>
      <br />
      <div>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.totalPrice}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(item.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginLeft:'10rem', fontWeight:'bold'}}> 
          Pay for Add Ons
        </div>
        
        <div className='cart-checkout'>
          <p>Total: ₹{totalPrice}</p>
          <Link to={'/user/PaymentCart'}> 
          <button style={{ display: 'flex', justifyContent: 'center',  }}>Checkout to Payment</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;



