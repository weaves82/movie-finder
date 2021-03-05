import React from "react";
import TextInput from "../../UI/Form/TextInput/TextInput";

import { filterProps } from "../../filterForm.model";

const YearFilter = (props: filterProps) => {
  const onChangeHandler = (value: string) => {
    props.onChange({ year: value });
  };

  return (
    <div>
      <h3>Add a Year</h3>
      <TextInput
        onChange={onChangeHandler}
        label="Year"
        id="year"
        isReset={props.isReset}
      />
    </div>
  );
};

export default YearFilter;
