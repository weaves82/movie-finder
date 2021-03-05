import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";

import TextInput from "./TextInput";
import { inputProps } from "../../../filterForm.model";

const initialProps = {
  label: "name",
  id: "id",
  onChange: jest.fn(),
  isReset: false,
};

const setup = (props: inputProps = initialProps) => {
  return shallow(<TextInput {...props} />);
};

const setupMount = (props: inputProps = initialProps) => {
  return mount(<TextInput {...props} />);
};

describe("TextInput", () => {
  test("component renders", () => {
    const wrapper = setup();
    const textInputComponent = findByTestAttr(wrapper, "component-text-input");
    expect(textInputComponent.length).toBe(1);
  });
  describe("text input input", () => {
    test("label and id are correctly added", () => {
      const wrapper = setup();
      const textInputComponent = findByTestAttr(
        wrapper,
        "component-text-input"
      );
      const textInputInput = textInputComponent.find("input");
      const textInputLabel = textInputComponent.find("label");
      expect(textInputLabel.text()).toContain("name");
      expect(textInputInput.props()).toHaveProperty("id", "id");
    });
    describe("value updates", () => {});
    test("value updates onchange", () => {
      const mockFunction = jest.fn();
      React.useState = jest.fn(() => ["", mockFunction]);
      const wrapper = setup();
      const textInputComponent = findByTestAttr(
        wrapper,
        "component-text-input"
      );
      const textInputInput = textInputComponent.find("input");
      const mockEvent = { currentTarget: { value: "train" } };
      textInputInput.simulate("change", mockEvent);
      expect(initialProps.onChange).toHaveBeenCalledWith("train");
      expect(mockFunction).toHaveBeenCalledWith("train");
    });
    test("value is reset if isReset is true", () => {
      const mockFunction = jest.fn();
      React.useState = jest.fn(() => ["", mockFunction]);
      const wrapper = setupMount();
      wrapper.setProps({ isReset: true });
      expect(mockFunction).toHaveBeenCalledWith("");
    });
  });
});
