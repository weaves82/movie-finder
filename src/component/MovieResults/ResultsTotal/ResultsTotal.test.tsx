import React from "react";
import { mount } from "enzyme";
import * as redux from "react-redux";
import { findByTestAttr, storeFactory } from "../../../test/testUtils";

import ResultsTotal from "./ResultsTotal";

const store = storeFactory({});

const setup = () => {
  return mount(
    <redux.Provider store={store}>
      <ResultsTotal />
    </redux.Provider>
  );
};

describe("Results", () => {
  test("renders ok", () => {
    const wrapper = setup();
    const resultsComp = findByTestAttr(wrapper, "component-results-total");
    expect(resultsComp.length).toBe(1);
  });
  test("correct results render", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(197);
    const wrapper = setup();
    const resultsComp = findByTestAttr(wrapper, "component-results-total");
    expect(resultsComp.text()).toBe("197 Results found");
  });
  test("component is not rendered if no results", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(null);
    const wrapper = setup();
    const resultsComp = findByTestAttr(wrapper, "component-results-total");
    expect(resultsComp.text()).toBe("");
  });
  test("Result found singular if only one result", () => {
    const useDispatchSpy = jest.spyOn(redux, "useSelector");
    useDispatchSpy.mockReturnValue(1);
    const wrapper = setup();
    const resultsComp = findByTestAttr(wrapper, "component-results-total");
    expect(resultsComp.text()).toBe("1 Result found");
  });
});
