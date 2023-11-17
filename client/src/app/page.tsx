"use client"
import React, { useEffect, useState } from 'react'
import './styles/home.module.css'
import { Inter } from 'next/font/google'
import ImageSlider from './components/dashboard/home/movieCarousel'
import MoviesList  from './components/dashboard/home/recommendedMovies'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // useEffect(() => {
  //   const getData = async () => {
  //     const query = await fetch("http://localhost:8080/home");
  //     const resp = await query.json();
  //     console.log('response: ', resp);
  //   }
  //   getData();
  // }, []);
  return (
    <>
      <ImageSlider />
      <MoviesList />
    </>
  )
}