
import React from 'react';
import { SlBasketLoaded } from "react-icons/sl";
import './MainNavbar.css'
import { IoPersonCircleOutline } from "react-icons/io5";

import {  useNavigate } from 'react-router-dom';




const MainNavbar = () => {
 
  const navigate =useNavigate();

  const handleCart=()=>{
    navigate ('/user/cart')

  }
  const handleProfile=()=>{
    navigate('/user/Account')
  }
  return (
    <> 
    <div className='home-headerr'> 
    <div onClick={handleProfile} > <IoPersonCircleOutline size={30} /> Profile  </div> 

<div onClick={handleCart}> Cart <SlBasketLoaded size={30}  />  </div>
    </div>
    
    </>
   
  )
}

export default MainNavbar