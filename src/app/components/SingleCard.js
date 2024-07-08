import React from "react";
import "./SingleCard.css";
import Image from "next/image";

const SingleCard = ({ card, handleChoice }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <Image
          height={250}
          width={250}
          className="front"
          src={card}
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
