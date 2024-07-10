"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const page = ({ searchParams }) => {
  console.log(searchParams.name);
  return (
    <div>
      <Button>okok</Button>
      {searchParams.name}
      {searchParams.dataa.map((imgSrc) => (
        <Image
          key={Math.random()}
          width={100}
          height={100}
          src={imgSrc}
          alt="image"
        />
      ))}
    </div>
  );
};

export default page;
