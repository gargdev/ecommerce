// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Home/Hero';
import Browse from '../components/Home/Browse';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Shiping from '../components/Home/Shiping';

const Home = () => {
  return (
    <div>
      {<Hero/>}
      {<Browse/>}
      {<FeaturedProducts/>}
      {<Shiping/>}
    </div>
  );
};

export default Home;
