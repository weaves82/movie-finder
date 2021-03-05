import React from "react";
import { mount } from "enzyme";
import * as redux from "react-redux";
import { findByTestAttr, storeFactory } from "../../../test/testUtils";

import Pagination from "./Pagination";

const store = storeFactory({});

const setup = () => {
  return mount(
    <redux.Provider store={store}>
      <Pagination />
    </redux.Provider>
  );
};

describe("Pagination", () => {
  test("renders ok", () => {
    const wrapper = setup();
    const paginationComp = findByTestAttr(wrapper, "component-pagination");
    expect(paginationComp.length).toBe(1);
  });
  test("pages are correct based on TotalResults", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValueOnce(10).mockReturnValueOnce({});
    const wrapper = setup();
    const paginationText = findByTestAttr(wrapper, "pagination-page-details");
    expect(paginationText.text()).toContain("Page 1 of 10");
  });
  test("no results render if no TotalResults", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValueOnce(null).mockReturnValueOnce({});
    const wrapper = setup();
    const paginationText = findByTestAttr(wrapper, "pagination-page-details");
    expect(paginationText.length).toBe(0);
  });
  test("no buttons if total results is 1", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValueOnce(1).mockReturnValueOnce({});
    const wrapper = setup();
    const paginationButtons = findByTestAttr(wrapper, "pagination-buttons");
    expect(paginationButtons.length).toBe(0);
  });
  describe("buttons", () => {
    test("previous button works", () => {
      const useSelectorSpy = jest.spyOn(redux, "useSelector");
      useSelectorSpy.mockReturnValueOnce(10).mockReturnValueOnce({
        searchPayload: {},
        searchType: "updateMoviesFilter",
      });
      let mockFunction = jest.fn();
      let initialStateForFirstUseStateCall: number = 1;
      React.useState = jest
        .fn()
        .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction]);
      React.useState = jest
        .fn()
        .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction]);
      const useDispatchSpy = jest.spyOn(redux, "useDispatch");
      const mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);
      const wrapper = setup();
      const paginationButtons = findByTestAttr(wrapper, "next-button");
      paginationButtons.at(1).simulate("click", {});
      expect(mockFunction).toBeCalledWith(2);
      expect(mockDispatchFn).toBeCalled();
    });
    test("next button works", () => {
      const useSelectorSpy = jest.spyOn(redux, "useSelector");
      useSelectorSpy.mockReturnValueOnce(10).mockReturnValueOnce({
        searchPayload: {},
        searchType: "updateMoviesFilter",
      });
      let mockFunction = jest.fn();
      let initialStateForFirstUseStateCall: number = 2;
      React.useState = jest
        .fn()
        .mockReturnValueOnce([initialStateForFirstUseStateCall, mockFunction]);
      const useDispatchSpy = jest.spyOn(redux, "useDispatch");
      const mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);
      const wrapper = setup();
      const paginationButtons = findByTestAttr(wrapper, "previous-button");
      paginationButtons.at(1).simulate("click", {});
      expect(mockFunction).toBeCalledWith(1);
      expect(mockDispatchFn).toBeCalled();
    });
  });
});
