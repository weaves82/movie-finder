import React from "react";
// __tests__/hello_world.test.js
import { shallow } from "enzyme";

describe("Hello, Enzyme!", () => {
  test.skip("renders", () => {
    const wrapper = shallow(
      <div>
        <h1>Hello, Enzyme!</h1>
      </div>
    );
    expect(wrapper.find("h1").html()).toMatch(/Hello, Enzyme/);
  });
});
