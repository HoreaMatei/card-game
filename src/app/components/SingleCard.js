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
      <div className={flipped ? "flipped " : ""}>
        <Image
          height={250}
          width={250}
          className="front"
          src={card.imgSrc}
          alt="card front"
        />
        <Image
          onClick={handleClick}
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
