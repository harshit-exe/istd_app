import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'
import Home from '@/components/Home/home'
import WhyChooseUs from '@/components/Home/WhyChooseUs'

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <div className='ml-0 md:ml-20'>
        <Home />
        <WhyChooseUs />
      </div>
      <Footer />
    </div>
  )
}

export default page