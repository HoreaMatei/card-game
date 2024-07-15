"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import "@/app/globals.css";

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

  const arraysMatched = searchParams.dataa.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
  }));

  const cardArray = [...arraysMatched, ...arraysMatched];
  const cardArray2 = cardArray.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
    index,
  }));
  const shuffleCards = () => {
    const shuffledDouble = cardArray2.sort(() => 0.5 - Math.random());
    console.log(shuffledDouble);
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
    <main className="main">
      <div className="characterAndBtn">
        <div className="characterName">{searchParams.name}</div>
        <Button className="shuffleBtn" onClick={shuffleCards}>
          shuffle{" "}
        </Button>
      </div>

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
