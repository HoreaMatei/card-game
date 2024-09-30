"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import Link from "next/link";
import react, { useState, useRef } from "react";
import Image from "next/image";
import { MedievalSharp } from "next/font/google";
export const fetcher = (url) => fetch(url).then((res) => res.json());

export const medieval = MedievalSharp({ subsets: ["latin"], weight: "400" });
function Page() {
  const heroRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useSWR(shouldFetch ? process.env.KEY : null, fetcher);

  function handleClick() {
    if (document.getElementById("input").value == "") {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }

    setInputValue(document.getElementById("input").value);
  }

  function enterPressed(e) {
    if (e.key === "Enter") {
      handleClick();
    }
  }
  return (
    <div className="page">
      <video
        playsinline
        style="user-select: none;"
        autoPlay
        loop
        muted
        className="videoBg"
      >
        <source src="./2.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="subDiv">
          <p className={`title `}>Lord of The Rings card game</p>

          <div className="searchDiv">
            <input
              autocomplete="off"
              type="search"
              placeholder="search for a character..."
              id="input"
              onKeyDown={enterPressed}
              required
              className={medieval.className}
            ></input>

            <Button onClick={handleClick} className="searchBtn">
              <Image
                src="/search.png"
                priority
                width={30}
                height={30}
                alt="search"
              />
            </Button>
          </div>
        </div>

        {data &&
        data.story.content.body[0].columns.filter((item) =>
          item.title.toLowerCase().includes(inputValue.toLowerCase())
        ) ? (
          <div className="linksContainer">
            {data.story.content.body[0].columns.map((item, index) => (
              <div key={data.story.content.body[0].columns[index].title}>
                {" "}
                {item.title.toLowerCase().includes(inputValue.toLowerCase()) ? (
                  <div className="links">
                    <Link
                      className="noDec"
                      href={{
                        pathname: `/pop`,
                        query: {
                          name: data.story.content.body[0].columns[index].title,
                          data: data,
                          dataa: data.story.content.body[0].columns[
                            index
                          ].image.map((item) => item.filename),
                          img: data.story.content.body[0].columns[0].image,
                        },
                      }}
                      id={index}
                    >
                      {" "}
                      {item.title}
                    </Link>
                  </div>
                ) : null}{" "}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;
