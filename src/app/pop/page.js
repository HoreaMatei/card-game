"use client";
import React from "react";
import Navbar from "../components/Navbar";

import { Button } from "@nextui-org/react";

import "@/app/globals.css";
import "./pop.css";

import { useEffect, useState } from "react";
import SingleCard from "@/app/components/SingleCard";
import { medieval } from "../page";

export default function Home({ searchParams }) {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (
        choiceOne.imgSrc === choiceTwo.imgSrc &&
        choiceOne.index != choiceTwo.index
      ) {
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

  const data = searchParams.data;

  const arraysMatched = searchParams.dataa.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
  }));

  const cardArray2 = [...arraysMatched, ...arraysMatched].map(
    (imgSrc, index) => ({
      imgSrc,
      matched: false,
      index,
    })
  );

  const shuffleCards = () => {
    const shuffledDouble = cardArray2.sort(() => 0.5 - Math.random());
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledDouble);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <main className="main2">
      <Navbar />
      <video autoPlay loop muted className="videoBg2">
        <source src="./7.mp4" type="video/mp4" />
      </video>
      <div className="characterAndBtn">
        <div className="characterName">{searchParams.name}</div>
        <Button
          className={`shuffleBtn ${medieval.className}`}
          onClick={shuffleCards}
        >
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
      <p className="turns">Turns: {turns}</p>
    </main>
  );
}
