import React from "react";
import "./SIngleCard.css";
import Image from "next/image";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      start();
    }
  };
  let audio = new Audio("./flip2.mp3");
  const start = () => {
    audio.play();
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped " : ""} onClick={handleClick}>
        <Image
          height={200}
          width={200}
          className="front"
          src={card.imgSrc.imgSrc}
          alt="card front"
        />
        <Image
          height={200}
          width={200}
          className="back"
          src="/ring6.jpg"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
