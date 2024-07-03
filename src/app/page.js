'use client'

import Image from "next/image";
import styles from "./page.module.css";
import useSWR from "swr"

import { Button } from "@nextui-org/react";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default  function Home() {
  


 //const data2 = await fetch('https://api.storyblok.com/v2/cdn/stories/rings?version=draft&token=OQ09pa2LLqe7rgabggVtmQtt&cv=1720014571')
 // .then((response)=>response.json())


  const { data, error, isLoading } = useSWR('https://api.storyblok.com/v2/cdn/stories/rings?version=draft&token=OQ09pa2LLqe7rgabggVtmQtt&cv=1720014571', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  


  const img = data.story.content.body[0].columns[0].image
  const arrayS = [img.map((item)=>item.filename)]
  
   
  const shuffleCards =  ()=>{
    const shuffledCards = [...arrayS, ...arrayS].sort(()=> Math.random() + 1)
    console.log(shuffledCards)  
 
  
   
  }


  return(
    <main className={styles.main}>
    <Button onClick={shuffleCards}>shuffle </Button>   
 
     {data.story.content.body[0].columns[0].title}

     
  
     {img.map((imgg) =><div> <Image  height={200} width={200} src= {imgg.filename} />  <Image  src="/lotr.avif" height={200} width={200}/></div>)}
    </main>
  );
}
