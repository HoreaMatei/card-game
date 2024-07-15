import React from "react";
import "./SingleCard.css";
import Image from "next/image";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped " : ""} onClick={handleClick}>
        <Image
          height={250}
          width={250}
          className="front"
          src={card.imgSrc.imgSrc}
          alt="card front"
        />
        <Image
          height={250}
          width={250}
          className="back"
          src="/lotr.avif"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
