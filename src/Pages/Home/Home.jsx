import React from 'react';
import { Search, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; // Aponar image path
import Hero from './Hero';
import Collections from './Collections';
import NewArrivals from './NewArrivals';
import LandingPage from './LandingPage';

const Home = () => {
  return (
    <div>
        <title>Home Section</title>
        <Hero />
        <NewArrivals />
        <Collections />
        <LandingPage />
        
        
    </div>
  );
};

export default Home;