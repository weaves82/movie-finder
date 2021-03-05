import React from "react";

import Toggle from "../UI/Toggle/Toggle";
import "./ThemeSwitcher.scss";

const ThemeSwitcher: React.FC = () => {
  const onToggleHandler = (isClicked: boolean) => {
    isClicked
      ? (document.getElementById("app")!.className = "dark-theme")
      : (document.getElementById("app")!.className = "light-theme");
  };

  return (
    <div className="theme-switcher" data-test="component-theme-switcher">
      <Toggle on="Dark" off="Light" onToggle={onToggleHandler} />
    </div>
  );
};

export default ThemeSwitcher;
