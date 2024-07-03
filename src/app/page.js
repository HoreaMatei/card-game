'use client'
import './globals.css'

import Image from "next/image";
import styles from "./page.module.css";
import useSWR from "swr"

import { Button } from "@nextui-org/react";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default  function Home() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)


 //const data2 = await fetch('https://api.storyblok.com/v2/cdn/stories/rings?version=draft&token=OQ09pa2LLqe7rgabggVtmQtt&cv=1720014571')
 // .then((response)=>response.json())


  const { data, error, isLoading } = useSWR('https://api.storyblok.com/v2/cdn/stories/rings?version=draft&token=OQ09pa2LLqe7rgabggVtmQtt&cv=1720014571', fetcher)
 
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  


  const img = data.story.content.body[0].columns[0].image
  const arrayS = img.map((item)=>item.filename)
  
   
  const shuffleCards =  ()=>{
    const cardsArray = [...arrayS, ...arrayS]
    const shuffledCards = cardsArray.sort(()=>0.5 - Math.random())
    setCards(shuffledCards)

    console.log(cards)  
 
  
   
  }


  return(
    <main className={styles.main}>
    <Button onClick={shuffleCards}>shuffle </Button>   
 
     {data.story.content.body[0].columns[0].title}
     <div className="card-grid">
     
          {cards.map(card=> (
            <div className="card" key={card.id}>
              <div>
                <Image height={250} width={250} className="front" src={card} alt= 'card front' />
                <Image height={250} width={250} className="back" src="/lotr.avif" alt="card back" />
              </div>
            </div>
          ))}
       
       

     </div>

     
  
    
    </main>
  );
}
