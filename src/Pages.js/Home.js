import React from 'react';
import Navbar from '../components/navbar.js'
import ImageSlider from '../components/ImageSlider.js';
import ButtonGrid from '../components/ButtonGrid';
import Card from '../components/Cards.js'
import PosterSection from '../components/howtouseposter.js'
import Footer from '../components/footer.js';
const Home = () => {
  return (
    <div>
      <Navbar/>
<ImageSlider/>
      <ButtonGrid/>
      <Card/>
      <PosterSection/>
      <Footer/>
      {/* Other content of home page */}
    </div>
  );
};

export default Home;
