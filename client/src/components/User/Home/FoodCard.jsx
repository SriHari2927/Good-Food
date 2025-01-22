import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarRatings from './StarRatings';

const FoodCard = ({ image, name, description, localStorageKey }) => {
  const theme = useTheme();

  // State to manage the quantity of the item
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Load saved quantity from localStorage (if any)
    const savedQuantity = JSON.parse(localStorage.getItem(localStorageKey)) || 0;
    setQuantity(savedQuantity);
  }, [localStorageKey]);

  useEffect(() => {
    // Save quantity to localStorage whenever it changes
    localStorage.setItem(localStorageKey, JSON.stringify(quantity));
  }, [quantity, localStorageKey]);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  const handleAdd = () => setQuantity(1);

  return (
    
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'row' },
        alignItems: 'center',
        width: { xs: '90%', sm: '60%' },
        maxWidth: 400,
        margin: '10px auto',
        textAlign: 'center',
        boxShadow: 3,
      }}
    >
      {/* Left Section: Image and Quantity Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          paddingLeft: 4,
          width: { xs: '40%', sm: '40%' },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: { xs: 100, sm: 150 },
            width: { xs: 120, sm: 150 },
            marginBottom: 2,
          }}
          image={image}
          alt={name}
        />
        {quantity > 0 ? (
          <div className="quantity-container" style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleDecrement} style={{ padding: '6px 12px', marginRight: '10px' }}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement} style={{ padding: '6px 12px', marginLeft: '10px' }}>+</button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              padding: '6px 16px',
              borderRadius: '4px',
              border: 'none',
            }}
          >
            Add
          </button>
        )}
      </Box>

      {/* Right Section: Description and Rating */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 0,
          textAlign: 'left',
          width: { xs: '60%', sm: '60%' },
        }} >
        <CardContent>
 
<Typography
  component="div"
  variant="h6"
  sx={{
    fontSize: { xs: '1rem', sm: '1.25rem' },
    wordWrap: 'break-word', 
    whiteSpace: 'normal',  
    textAlign: 'left',
  }}> 
  {name}
</Typography>
<Typography
  variant="subtitle1"
  component="div"
  sx={{
    color: 'text.secondary',
    fontSize: { xs: '0.8rem', sm: '1rem' },
    wordWrap: 'break-word', 
    whiteSpace: 'normal',  
    textAlign: 'left',
    lineHeight: '1.5', 
  }}
>
  {description}
</Typography>


        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <StarRatings />
        </Box>
      </Box>
    </Card>
    
  );
};

export default FoodCard;
