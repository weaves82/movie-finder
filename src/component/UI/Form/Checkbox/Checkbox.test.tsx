import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";

import Checkbox from "./Checkbox";
import { checkboxProps } from "../../../filterForm.model";

const initialProps = {
  label: "name",
  id: "test",
  onChange: jest.fn(),
  isReset: false,
  order: 2,
};

const setup = (props: checkboxProps = initialProps) => {
  return shallow(<Checkbox {...props} />);
};

const setupMount = (props: checkboxProps = initialProps) => {
  return mount(<Checkbox {...props} />);
};

describe("checkbox component", () => {
  test("check it renders", () => {
    const wrapper = setup();
    const checkboxComponent = findByTestAttr(wrapper, "component-checkbox");
    expect(checkboxComponent.length).toBe(1);
  });
  test("the label and input props are passed correctly", () => {
    const wrapper = setup();
    const checkboxComponent = findByTestAttr(wrapper, "component-checkbox");
    const checkboxCompLabel = checkboxComponent.find("label");
    expect(checkboxCompLabel.text()).toContain("name");
    const checkboxCompInput = checkboxComponent.find("input");
    expect(checkboxCompInput.props()).toHaveProperty("id", "test");
  });
  describe("checkbox state updates correctly", () => {
    let mockFunction: any;
    beforeEach(() => {
      jest.clearAllMocks();
      mockFunction = jest.fn();
      React.useState = jest.fn(() => ["", mockFunction]);
      const wrapper = setup();
      const checkboxComponent = findByTestAttr(wrapper, "component-checkbox");
      const checkboxCompInput = checkboxComponent.find("input");
      const mockEvent = { target: { checked: true } };
      checkboxCompInput.simulate("change", mockEvent);
    });
    test("setChecked is called on click", () => {
      expect(mockFunction).toHaveBeenCalled();
    });
    test("onChange is called with order", () => {
      expect(initialProps.onChange).toHaveBeenCalledWith(
        "test",
        true,
        "name",
        2
      );
    });
    test("onChange is called without order", () => {
      const initialProps = {
        label: "name",
        id: "test",
        onChange: jest.fn(),
        isReset: false,
      };
      const wrapper = setup(initialProps);
      const checkboxComponent = findByTestAttr(wrapper, "component-checkbox");
      const checkboxCompInput = checkboxComponent.find("input");
      const mockEvent = { target: { checked: true } };
      checkboxCompInput.simulate("change", mockEvent);
      expect(initialProps.onChange).toHaveBeenCalledWith("test", true, "name");
    });
    test("isReset is correctly called", () => {
      mockFunction = jest.fn();
      React.useState = jest.fn(() => ["", mockFunction]);
      const wrapper = setupMount();
      wrapper.setProps({ isReset: true });
      expect(mockFunction).toHaveBeenCalledWith(false);
    });
  });
});
