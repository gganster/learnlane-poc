import { useState } from 'react'
import Header from '@/components/LandingPage/Header'
import HeroSection from '@/components/LandingPage/HeroSection'
import Pricing from '@/components/LandingPage/Pricing'
import FAQ from '@/components/LandingPage/FAQ'
import Footer from '@/components/LandingPage/Footer'
import './index.css'

const LandingPage = () => {
  return (
        <section class="landing-page">
          <Header />
          <HeroSection />
          <Pricing />
          <FAQ/>
          <Footer />
        </section>
    )
}

export default LandingPage;