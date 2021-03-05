import React from "react";
//import { useDispatch, Provider } from "react-redux";
import * as redux from "react-redux";
import { mount, shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import MovieRandomizer from "./MovieRandomizer";

const setup = () => {
  const store = storeFactory({});
  return mount(
    <redux.Provider store={store}>
      <MovieRandomizer />
    </redux.Provider>
  );
};

describe("MovieRandomizer", () => {
  test("movieRandomizer is rendered", () => {
    const wrapper = setup();
    const movieRandomComponent = findByTestAttr(
      wrapper,
      "component-movie-randomizer"
    );
    expect(movieRandomComponent.length).toBe(1);
  });
  test("onClickHandler is called correctly", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const wrapper = setup();
    const movieRandomComponent = findByTestAttr(
      wrapper,
      "component-movie-randomizer"
    );
    const button = movieRandomComponent.find("button");
    button.simulate("click", {});
    expect(mockDispatchFn).toHaveBeenCalled();
    useDispatchSpy.mockClear();
  });
});
