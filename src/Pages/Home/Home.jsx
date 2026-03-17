import React from 'react';
import Hero from './Hero';
import Collections from './Collections';
import NewArrivals from './NewArrivals';
import LandingPage from './LandingPage';

const Home = () => {
  return (
    <div>
        <title>New Collection</title>
        <Hero />
        <NewArrivals />
        <Collections />
        <LandingPage />
        
        
    </div>
  );
};

export default Home;