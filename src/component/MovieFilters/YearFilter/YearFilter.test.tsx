import React from "react";
import { shallow } from "enzyme";

import YearFilter from "./YearFilter";
import TextInput from "../../UI/Form/TextInput/TextInput";
import { FilterProps } from "../../filterForm.model";

const initialProps = {
  onChange: jest.fn(),
  isReset: false,
};

const setup = (props: FilterProps = initialProps) => {
  return shallow(<YearFilter {...props} />);
};

describe("YearFilter component", () => {
  test("renders correctly", () => {
    setup();
  });
  test("props are called correctly", () => {
    const wrapper = setup();
    expect(wrapper.find(TextInput).props()).toHaveProperty("isReset", false);
  });
  test("onChangeHandler calls onChange correctly", () => {
    const wrapper = setup();
    wrapper.find(TextInput).simulate("change", "1990");
    expect(initialProps.onChange).toHaveBeenCalledWith({ year: "1990" });
  });
});
