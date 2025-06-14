import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedShops from '../components/Home/FeaturedShops';
import TrendingOffers from '../components/Home/TrendingOffers';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedShops />
      <TrendingOffers />
    </div>
  );
};

export default Home;