import React from "react";
import "./Backdrop.scss";

const Backdrop: React.FC<{ show: boolean; clicked: () => void }> = (props) => {
  return props.show ? (
    <div className="Backdrop" onClick={props.clicked}></div>
  ) : null;
};

export default Backdrop;
