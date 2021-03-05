import React from "react";
import { checkboxProps } from "../../../filterForm.model";

const CheckBox: React.FC<checkboxProps> = (props) => {
  const { label, id, order, onChange, isReset } = props;

  const [checked, setChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    isReset && setChecked(false);
  }, [isReset]);

  const onCheckboxChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    order
      ? onChange(id, event.target.checked, label, order)
      : onChange(id, event.target.checked, label);
    setChecked(event.target.checked);
  };

  return (
    <div data-test="component-checkbox">
      <label htmlFor={id}>
        {label}:
        <input
          id={id}
          checked={checked}
          type="checkbox"
          onChange={onCheckboxChecked}
        />
      </label>
    </div>
  );
};

export default CheckBox;
