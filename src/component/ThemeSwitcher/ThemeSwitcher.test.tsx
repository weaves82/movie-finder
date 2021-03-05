import React from "react";
import { Provider } from "react-redux";
import { mount, ShallowWrapper } from "enzyme";
import { findByTestAttr, storeFactory } from "../../test/testUtils";
import App from "../../App";

const setup = () => {
  const store = storeFactory({});
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("ThemeSwitcher component", () => {
  let wrapper = setup();
  test("component renders", () => {
    const component: ShallowWrapper = findByTestAttr(
      wrapper,
      "component-theme-switcher"
    );
    expect(component.length).toBe(1);
  });
  test("the onToggleHandler function is called correctly", () => {
    let spy: jest.SpyInstance;
    spy = jest.spyOn(document, "getElementById");
    let mockElement: HTMLDivElement = document.createElement("div");

    // add the text node to the newly created div
    spy.mockReturnValue(mockElement);

    const input = wrapper.find(".theme-switcher input");
    input.simulate("change", { target: { checked: false } });
    expect(mockElement.className).toBe("light-theme");
    input.simulate("change", { target: { checked: true } });
    expect(mockElement.className).toBe("dark-theme");
  });
});
