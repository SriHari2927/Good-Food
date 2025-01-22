// import React from 'react'
// import './MainFeedItems.css'

// const MainFeedItems = () => {
//   return (
//     <div className='feed-header'> 
//     <button> Feed Items </button>
//     </div>
//   )
// }

// export default MainFeedItems



import React, { useState } from 'react';
import './MainFeedItems.css';
import { Link } from 'react-router-dom';

const MainFeedItems = () => {

  return (
    <div className="feed-header">
      <Link to='/admin/feeditemoption'> 
      <button>Feed Items</button>
      </Link>     
    </div>
  );
};

export default MainFeedItems;
