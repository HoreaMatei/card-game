"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import "./globals.css";

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import SingleCard from "@/app/components/SingleCard";

export default function Home({ searchParams }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.imgSrc === choiceTwo.imgSrc) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.imgSrc === choiceOne.imgSrc) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(cards);

  const data = searchParams.data;

  const img = data.story.content.body[0].columns[0].image;
  const arrayS = img.map((item) => item.filename);

  const arraysMatched = arrayS.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
  }));

  const cardArray = [...arrayS, ...arrayS];
  const cardArray2 = cardArray.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
    index,
  }));
  const shuffleCards = () => {
    const shuffledDouble = cardArray2.sort(() => 0.5 - Math.random());
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledDouble);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <main className={styles.main}>
      <Button onClick={shuffleCards}>shuffle </Button>

      {data.story.content.body[0].columns[0].title}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.index}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </main>
  );
}
