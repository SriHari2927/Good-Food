import React from 'react';
import './MenuAddon.css';
import Typography from '@mui/material/Typography';
import MainNavbar from '../Navbar/MainNavbar';
import Footer from './Footer';
import FoodCard from './FoodCard';
import idlyImage from '../../../assets/idly.jpg';
import dosaImage from '../../../assets/dosa.webp';

const MenuAddon = () => {
  return (
    <>
      <MainNavbar />
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px', marginTop: '2rem', fontWeight:'bold' }}>
        {/* Menu Add-ons  */}
        List of Items for Add-Ons
      </Typography>

<div className="foodcard-column">
  <FoodCard
    image={idlyImage}
    name="Idly+Chutney+Sambar"
    description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
    localStorageKey="idlyQuantity"
  />
  <FoodCard
    image={dosaImage}
    name="Dosa+Chutney+Sambar+Dosa"
    description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
    localStorageKey="dosaQuantity"
  />
  <FoodCard
    image={idlyImage}
    name="Idly+Chutney+Sambar"
    description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
    localStorageKey="idlyQuantity"
  />
  <FoodCard
    image={dosaImage}
    name="Dosa+Chutney+Sambar"
    description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
    localStorageKey="dosaQuantity"
  />

<FoodCard
    image={idlyImage}
    name="Idly+Chutney+Sambar"
    description="(40 grams) contains 120, 3.7 grams of total fat, 1.3 grams of saturated fat."
    localStorageKey="idlyQuantity"
  />
  <FoodCard
    image={dosaImage}
    name="Dosa+Chutney+Sambar"
    description="(80 grams) contains 200, 8 grams of total fat, 2 grams of saturated fat."
    localStorageKey="dosaQuantity"
  />
</div>
      <Footer />
    </>
  );
};

export default MenuAddon;





