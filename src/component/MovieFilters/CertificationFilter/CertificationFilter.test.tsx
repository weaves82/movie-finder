import React from "react";
import { shallow, mount } from "enzyme";

import * as helpers from "../../../helpers/helpersTs";

import CertificationFilter from "./CertificationFilter";
import { FilterProps } from "../../filterForm.model";
import Checkbox from "../../UI/Form/Checkbox/Checkbox";

const initialProps = {
  onChange: jest.fn(),
  isReset: false,
};

const setup = (props: FilterProps = initialProps) => {
  return shallow(<CertificationFilter {...props} />);
};

const setupMount = (props: FilterProps = initialProps) => {
  return mount(<CertificationFilter {...props} />);
};

describe("Checkboxes", () => {
  let mockFunctionFilters, mockFunctionSetCheckBoxes: any, mockFunction;
  beforeEach(() => {
    mockFunctionFilters = jest.fn();
    mockFunctionSetCheckBoxes = jest.fn();
    mockFunction = jest.fn();
    const initialStateForFirstUseStateCall = [
      { id: "1", label: "label1", order: 1 },
    ];
    const initialStateForSecondUseStateCall: string[] = [];
    const initialStateForThirdUseStateCall = false;

    React.useState = jest
      .fn()
      .mockReturnValueOnce([
        initialStateForFirstUseStateCall,
        mockFunctionFilters,
      ])
      .mockReturnValueOnce([
        initialStateForSecondUseStateCall,
        mockFunctionSetCheckBoxes,
      ])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, mockFunction]);
  });
  test("they are rendered correctly", () => {
    setup();
  });
  test("onChangeHandler works as expected when genre is selected", () => {
    const wrapper = setup();
    wrapper.find(Checkbox).simulate("change", "PG", true, "name", 1);
    expect(mockFunctionSetCheckBoxes).toHaveBeenCalledWith([
      { order: 1, id: "PG", label: "name" },
    ]);
  });
  test("onChangeHandler works as expected when genre is deselected", () => {
    const wrapper = setup();
    wrapper.find(Checkbox).simulate("change", "PG", false, 1);
    expect(mockFunctionSetCheckBoxes).toHaveBeenCalledWith([]);
  });
});
describe("useEffect is working as expected", () => {
  let wrapper: any;
  let mockFunction = jest.fn();
  let initialStateForFirstUseStateCall = [
    { id: "1", label: "label1", order: 1 },
  ];
  let initialStateForSecondUseStateCall: string[] = [];
  let initialStateForThirdUseStateCall = false;
  let mockCertification = [
    { certification: "G", meaning: "All ages.", order: 1 },
    {
      certification: "PG",
      meaning:
        "Parental guidance advised. There is no age restriction but some material may not be suitable for all children.",
      order: 2,
    },
  ];
  let mockCertificationWithLabel = [
    { id: "G", label: "G", order: 1 },
    { id: "PG", label: "PG", order: 2 },
  ];
  beforeEach(() => {
    jest
      .spyOn(helpers, "getCertifications")
      .mockResolvedValue(mockCertification);
    React.useState = jest
      .fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, mockFunction]);
    wrapper = setupMount();
  });
  test("genres are rendered", async () => {
    expect(mockFunction).toHaveBeenCalledWith(mockCertificationWithLabel);
  });
  test("the checkboxes are empty after isReset is set", () => {
    React.useState = jest
      .fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, mockFunction]);
    wrapper.setProps({ isReset: true });
    expect(mockFunction).toHaveBeenCalledWith([]);
  });
});
