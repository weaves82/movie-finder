import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import Toggle from "./Toggle";

interface ToggleProps {
  on: string;
  off: string;
  onToggle: (isClicked: boolean) => void;
}

test("component renders correctly", () => {
  const wrapper: ShallowWrapper = shallow(
    <Toggle on="" off="" onToggle={() => {}} />
  );
  const newWordButton: ShallowWrapper = findByTestAttr(
    wrapper,
    "toggle-component"
  );
  expect(newWordButton.length).toBe(1);
});

test("props passed in correctly", () => {
  const wrapper: ShallowWrapper<ToggleProps> = shallow(
    <Toggle on="light" off="dark" onToggle={() => {}} />
  );
  expect(wrapper.props().on).not.toBeNull();
  expect(wrapper.props().off).not.toBeNull();
  expect(wrapper.props().onToggle).not.toBeNull();
});

test("toggle text is correct", () => {
  const wrapper: ShallowWrapper = shallow(
    <Toggle on="light" off="dark" onToggle={() => {}} />
  );
  expect(wrapper.find(".can-toggle__switch").prop("data-checked")).toEqual(
    "light"
  );
  expect(wrapper.find(".can-toggle__switch").prop("data-unchecked")).toEqual(
    "dark"
  );
});

test("checkbox calls function", () => {
  const mockOnToggle = jest.fn();
  const wrapper = shallow(
    <Toggle on="light" off="dark" onToggle={mockOnToggle} />
  );
  const input = wrapper.find("input");
  input.simulate("change", { target: { checked: true } });
  expect(mockOnToggle).toHaveBeenCalledWith(true);
  input.simulate("change", { target: { checked: false } });
  expect(mockOnToggle).toHaveBeenCalledWith(false);
});
