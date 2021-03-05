import React from "react";
import logo from "../../logo.svg";

const Logo = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <img
      style={{ cursor: "pointer" }}
      onClick={refreshPage}
      src={logo}
      className="app-logo"
      alt="logo"
    />
  );
};

export default Logo;
