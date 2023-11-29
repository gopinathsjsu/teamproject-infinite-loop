"use client"
import React from 'react'
import './styles/home.module.css'
import ImageSlider from './components/dashboard/home/movieCarousel'
import MovieSlider from './components/dashboard/home/recommendedMovies'
import TheaterNearBy from './components/dashboard/home/theatersNearBy'
import { useEffect, useState } from 'react';
import useStore from '@/src/store';


export default function Home() {
  const store: any = useStore();
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    // Check if the location is available in the store
    const currentLocation = store.pincode;
    if (currentLocation) {
      console.log(currentLocation + "iiiiiiiiiiii");
      setLocation(currentLocation);
    }
  }, [store]);
  return (
    <>
      <ImageSlider />
      <MovieSlider />
      {/* <TheaterNearBy /> */}
      {location && <TheaterNearBy location={location} />}
    </>
  )
}