"use client"
import React from 'react'
import './styles/home.module.css'
import ImageSlider from './components/dashboard/home/movieCarousel'
import MovieSlider from './components/dashboard/home/recommendedMovies'

export default function Home() {
  return (
    <>
      <ImageSlider />
      <MovieSlider />
    </>
  )
}