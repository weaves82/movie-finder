import React from "react";
import * as redux from "react-redux";
import { mount, ShallowWrapper } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import MovieSearch from "./MovieSearch";

const setup = () => {
  const store = storeFactory({});
  return mount(
    <redux.Provider store={store}>
      <MovieSearch />
    </redux.Provider>
  );
};

describe("the Movie Search Box", () => {
  beforeEach(() => {});
  test("it renders ok", () => {
    let wrapper = setup();
    const component: ShallowWrapper = findByTestAttr(
      wrapper,
      "component-movie-search"
    );
    expect(component.length).toBe(1);
  });
  test("input updates correctly", () => {
    const mockSetSearch = jest.fn();
    React.useState = jest.fn(() => ["", mockSetSearch]);
    let wrapper = setup();
    const inputBox: ShallowWrapper = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "potter" } };
    inputBox.simulate("change", mockEvent);
    expect(mockSetSearch).toHaveBeenCalledWith("potter");
  });
  test("onClickHandler is called correctly", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const wrapper = setup();
    const movieSearchComponent = findByTestAttr(
      wrapper,
      "component-movie-search"
    );
    const form = movieSearchComponent.find("form");
    form.simulate("submit", {});
    expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    useDispatchSpy.mockClear();
  });
});
