"use client"
import React , {useEffect,useState} from 'react'


export default function Home() {
  useEffect(()=>{
    const getData = async ()=> {
      const query = await fetch("http://localhost:8080/home");
      const resp = await query.json();
      console.log('response: ',resp);
    }
    getData();
  },[]);
  return (
    <main>Hello World.....!</main>
  )
}
