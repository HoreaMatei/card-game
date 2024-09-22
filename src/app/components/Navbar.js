import React from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav11">
      <Link className="home" href={"/"}>
        Home
      </Link>
    </div>
  );
};

export default Navbar;
