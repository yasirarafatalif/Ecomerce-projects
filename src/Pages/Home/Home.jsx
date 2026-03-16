import React from 'react';
import { Search, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; // Aponar image path
import Hero from './Hero';
import Collections from './Collections';

const Home = () => {
  return (
    <div>
        <Hero />
        <Collections />
    </div>
  );
};

export default Home;