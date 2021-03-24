import React from "react";
import { shallow, mount } from "enzyme";

import * as helpers from "../../../helpers/helpersTs";

import GenreFilter from "./GenreFilter";
import { FilterProps, FilterArrayProps } from "../../filterForm.model";
import Checkbox from "../../UI/Form/Checkbox/Checkbox";

const initialProps = {
  onChange: jest.fn(),
  isReset: false,
};

const setup = (props: FilterProps = initialProps) => {
  return shallow(<GenreFilter {...props} />);
};

const setupMount = (props: FilterProps = initialProps) => {
  return mount(<GenreFilter {...props} />);
};

describe("Checkboxes", () => {
  let mockSetFilters, mockSetCheckboxes: () => void, mockFunction;
  beforeEach(() => {
    mockSetFilters = jest.fn();
    mockSetCheckboxes = jest.fn();
    mockFunction = jest.fn();
    const initialStateForFirstUseStateCall = [{ id: "1", label: "label1" }];
    const initialStateForSecondUseStateCall: string[] = [];
    const initialStateForThirdUseStateCall = false;

    React.useState = jest
      .fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, mockSetFilters])
      .mockReturnValueOnce([
        initialStateForSecondUseStateCall,
        mockSetCheckboxes,
      ])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, mockFunction]);
  });
  test("they are rendered correctly", () => {
    setup();
  });
  test("onChangeHandler works as expected when genre is selected", () => {
    const wrapper = setup();
    wrapper.find(Checkbox).simulate("change", "PG", true, "name");
    expect(mockSetCheckboxes).toHaveBeenCalledWith([
      { id: "PG", label: "name" },
    ]);
  });
  test("onChangeHandler works as expected when genre is deselected", () => {
    const wrapper = setup();
    wrapper.find(Checkbox).simulate("change", "PG", false, "name");
    expect(mockSetCheckboxes).toHaveBeenCalledWith([]);
  });
});
describe("useEffect is working as expected", () => {
  let wrapper: any;
  let mockFunction = jest.fn();
  let initialStateForFirstUseStateCall = [{ id: "1", label: "label1" }];
  let initialStateForSecondUseStateCall: string[] = [];
  let initialStateForThirdUseStateCall = false;
  let mockGenres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
  ];
  let mockGenresWithLabel: FilterArrayProps[] = [
    { id: "28", label: "Action" },
    { id: "12", label: "Adventure" },
    { id: "16", label: "Animation" },
  ];
  beforeEach(() => {
    jest.spyOn(helpers, "getGenres").mockResolvedValue(mockGenres);
    React.useState = jest
      .fn()
      .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForSecondUseStateCall, mockFunction])
      .mockReturnValueOnce([initialStateForThirdUseStateCall, mockFunction]);
    wrapper = setupMount();
  });
  test("genres are rendered", async () => {
    expect(mockFunction).toHaveBeenCalledWith(mockGenresWithLabel);
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
