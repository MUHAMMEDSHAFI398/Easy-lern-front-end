import React from 'react'
import Footer from '../../Components/Landing/Footer/Footer'
import NavBar from '../../Components/Landing/NavBar/NavBar'
import Section1 from '../../Components/Landing/Section1/Section1'
import Section2 from '../../Components/Landing/Section2/Section2'
import Section3 from '../../Components/Landing/Section3/Section3'

function Landing() {
  return (
    <div>
      <NavBar/>
      <Section1/>
      <Section2/>
      <Section3/>
      <Footer/> 
    </div>
  )
}

export default Landing
