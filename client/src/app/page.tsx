"use client"
import React, { useEffect, useState } from 'react'
import './styles/home.module.css'
import { Inter } from 'next/font/google'
import MainBanner from './components/dashboard/home/mainBanner'
import MovieBanner from './components/dashboard/home/movieBanner'
import BottomBanner from './components/dashboard/home/bottomBanner'


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
    <MainBanner />
    <MovieBanner />
    <BottomBanner />
</>
  )
}