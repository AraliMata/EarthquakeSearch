import React from 'react'
import HeroSection from '../../HeroSection'
import SearchBar from '../../SearchBar'
import {homeObjOne} from './Data'

function Home() {
  return (
    <>
      <SearchBar />
      <HeroSection {...homeObjOne} />
    </>
  )
}

export default Home
