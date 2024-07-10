"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import Link from "next/link";
import react, { useState, useRef } from "react";

export const fetcher = (url) => fetch(url).then((res) => res.json());

function Page() {
  const heroRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useSWR(
    shouldFetch
      ? "https://api.storyblok.com/v2/cdn/stories/rings?version=draft&token=OQ09pa2LLqe7rgabggVtmQtt&cv=1720014571"
      : null,
    fetcher
  );

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
      <input
        autocomplete="off"
        type="search"
        placeholder="search for a character..."
        id="input"
        onKeyDown={enterPressed}
        required
      ></input>

      <Button onClick={handleClick}>Search</Button>

      {data &&
      data.story.content.body[0].columns.filter((item) =>
        item.title.toLowerCase().includes(inputValue)
      ) ? (
        <div>
          {data.story.content.body[0].columns.map((item, index) => (
            <div>
              {" "}
              {item.title.toLowerCase().includes(inputValue) ? (
                <Link
                  href={{
                    pathname: `/${item.title}`,
                    query: {
                      name: data.story.content.body[0].columns[index].title,

                      dataa: data.story.content.body[0].columns[
                        index
                      ].image.map((item) => item.filename),
                    },
                  }}
                  id={index}
                  replace
                >
                  {" "}
                  {item.title}
                </Link>
              ) : null}{" "}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Page;
