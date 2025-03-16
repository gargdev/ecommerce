// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Home/Hero';
import Browse from '../components/Home/Browse';
import FeaturedProducts from '../components/Home/FeaturedProducts';

const Home = () => {
  return (
    <div>
      {<Hero/>}
      {<Browse/>}
      {<FeaturedProducts/>}
    </div>
  );
};

export default Home;
