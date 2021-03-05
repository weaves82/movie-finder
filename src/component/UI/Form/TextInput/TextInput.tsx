import React, { FormEvent } from "react";
import { inputProps } from "../../../filterForm.model";

const TextInput: React.FC<inputProps> = (props) => {
  const { label, id, onChange, isReset } = props;

  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setValue("");
  }, [isReset]);

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange(event.currentTarget.value);
  };

  return (
    <div data-test="component-text-input">
      <label>
        {label}:
        <input id={id} type="text" onChange={onChangeHandler} value={value} />
      </label>
    </div>
  );
};

export default TextInput;
