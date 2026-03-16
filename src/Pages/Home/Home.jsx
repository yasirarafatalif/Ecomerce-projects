import React from 'react';
import { Search, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/bg-home1.png'; // Aponar image path
import Hero from './Hero';
import Collections from './Collections';
import NewArrivals from './NewArrivals';
import CollectionPage from '../Collections/CollectionPage';

const Home = () => {
  return (
    <div>
        <title>Home Section</title>
        <Hero />
        <NewArrivals />
        <Collections />
        {/* <CollectionPage /> */}
        
    </div>
  );
};

export default Home;