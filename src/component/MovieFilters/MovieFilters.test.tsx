import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";

import * as redux from "react-redux";

import { MemoizedMovieFilters } from "../MovieFilters/MovieFilters";

import Checkbox from "../UI/Form/Checkbox/Checkbox";

const setup = () => {
  const store = storeFactory({});
  return mount(
    <redux.Provider store={store}>
      <MemoizedMovieFilters />
    </redux.Provider>
  );
};

describe("movie filter", () => {
  test("component is rendered", () => {
    const wrapper = setup();
    const movieFilterComp = findByTestAttr(wrapper, "component-movie-filters");
    expect(movieFilterComp.length).toBe(1);
  });
  describe("handlers are called correctly", () => {
    let mockFunction,
      setFormMock: jest.Mock<any, any>,
      setShowFilterMock,
      setResetMock: jest.Mock<any, any>;
    beforeEach(() => {
      mockFunction = jest.fn();
      setFormMock = jest.fn();
      setShowFilterMock = jest.fn();
      setResetMock = jest.fn();
      let initialStateForFirstUseStateCallForm = {};
      let initialStateForSecondUseStateCallFilter = false;
      let initialStateForThirdUseStateCallReset = false;

      React.useState = jest
        .fn()
        .mockReturnValueOnce([
          initialStateForFirstUseStateCallForm,
          setFormMock,
        ])
        .mockReturnValueOnce([
          initialStateForSecondUseStateCallFilter,
          setShowFilterMock,
        ])
        .mockReturnValueOnce([
          initialStateForThirdUseStateCallReset,
          setResetMock,
        ])
        .mockReturnValueOnce([
          [{ id: "PG", label: "cert-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce([
          [{ id: "28", label: "genre-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce(["", mockFunction]);
    });
    test("submit handler dispatches the filter results", () => {
      const useDispatchSpy = jest.spyOn(redux, "useDispatch");
      const mockDispatchFn = jest.fn();
      useDispatchSpy.mockReturnValue(mockDispatchFn);
      const wrapper = setup();
      wrapper.find('[type="submit"]').at(1).simulate("submit");
      expect(mockDispatchFn).toHaveBeenCalledTimes(2);
      useDispatchSpy.mockClear();
    });
    test("onChange handler updates correctly", () => {
      const wrapper = setup();
      const genreCheckbox = wrapper.find(Checkbox).at(1).find("input");
      genreCheckbox.simulate("change", { target: { checked: true } });
      expect(setResetMock).toHaveBeenCalledWith(false);
      expect(setFormMock).toHaveBeenCalledWith(expect.any(Function));
    });
    test("onClickResetHandler", () => {
      const wrapper = setup();
      const resetButton = findByTestAttr(wrapper, "reset-button");
      resetButton.at(1).simulate("click", {});
      expect(setResetMock).toHaveBeenCalledWith(true);
      expect(setFormMock).toHaveBeenCalledWith({});
    });
  });
  describe("showFilters state", () => {
    test("when initially set to false", () => {
      let mockFunction, setFormMock, setShowFilterMock, setResetMock;
      mockFunction = jest.fn();
      setFormMock = jest.fn();
      setShowFilterMock = jest.fn();
      setResetMock = jest.fn();
      let initialStateForFirstUseStateCallForm = {};
      let initialStateForSecondUseStateCallFilter = false;
      let initialStateForThirdUseStateCallReset = false;

      React.useState = jest
        .fn()
        .mockReturnValueOnce([
          initialStateForFirstUseStateCallForm,
          setFormMock,
        ])
        .mockReturnValueOnce([
          initialStateForSecondUseStateCallFilter,
          setShowFilterMock,
        ])
        .mockReturnValueOnce([
          initialStateForThirdUseStateCallReset,
          setResetMock,
        ])
        .mockReturnValueOnce([
          [{ id: "PG", label: "cert-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce([
          [{ id: "28", label: "genre-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce(["", mockFunction]);
      const wrapper = setup();
      const resetButton = findByTestAttr(wrapper, "show-filters-button");
      const formContainer = findByTestAttr(wrapper, "filters-form-container");
      expect(resetButton.at(1).text()).toContain("Show Filters");
      expect(formContainer.hasClass("hidden")).toBe(true);
      resetButton.at(1).simulate("click", {});
      expect(setShowFilterMock).toHaveBeenCalledWith(true);
    });
    test("when initially set to true", () => {
      let mockFunction, setFormMock, setShowFilterMock, setResetMock;
      mockFunction = jest.fn();
      setFormMock = jest.fn();
      setShowFilterMock = jest.fn();
      setResetMock = jest.fn();
      let initialStateForFirstUseStateCallForm = {};
      let initialStateForSecondUseStateCallFilter = true;
      let initialStateForThirdUseStateCallReset = false;

      React.useState = jest
        .fn()
        .mockReturnValueOnce([
          initialStateForFirstUseStateCallForm,
          setFormMock,
        ])
        .mockReturnValueOnce([
          initialStateForSecondUseStateCallFilter,
          setShowFilterMock,
        ])
        .mockReturnValueOnce([
          initialStateForThirdUseStateCallReset,
          setResetMock,
        ])
        .mockReturnValueOnce([
          [{ id: "PG", label: "cert-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce([
          [{ id: "28", label: "genre-label1", order: 1 }],
          mockFunction,
        ])
        .mockReturnValueOnce([[], mockFunction])
        .mockReturnValueOnce([false, mockFunction])
        .mockReturnValueOnce(["", mockFunction]);
      const wrapper = setup();
      const resetButton = findByTestAttr(wrapper, "show-filters-button");
      const formContainer = findByTestAttr(wrapper, "filters-form-container");
      expect(resetButton.at(1).text()).toContain("Hide Filters");
      expect(formContainer.hasClass("hidden")).toBe(false);
      resetButton.at(1).simulate("click", {});
      expect(setShowFilterMock).toHaveBeenCalledWith(false);
    });
  });
});
