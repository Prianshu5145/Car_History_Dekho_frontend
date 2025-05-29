import React from 'react';
import Navbar from '../components/navbar.js'
import ImageSlider from '../components/ImageSlider.js';
import ButtonGrid from '../components/ButtonGrid';
import Card from '../components/Cards.js'
import PosterSection from '../components/howtouseposter.js'
import Footer from '../components/footer.js';
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <div>
    <Helmet>
  <meta name="robots" content="index, follow" />
</Helmet>

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
