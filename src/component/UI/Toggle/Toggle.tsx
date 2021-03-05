import React from "react";

import "./Toggle.scss";

interface ToggleProps {
  on: string;
  off: string;
  onToggle: (isClicked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const { on, off, onToggle } = props;

  const onCheckboxChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div data-test="toggle-component" className="can-toggle demo-rebrand-1">
      <input id="d" type="checkbox" onChange={onCheckboxChecked} />
      <label htmlFor="d">
        <div
          className="can-toggle__switch"
          data-checked={on}
          data-unchecked={off}
        ></div>
      </label>
    </div>
  );
};

export default Toggle;
