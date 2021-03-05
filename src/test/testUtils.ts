import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers";
import { middlewares } from "../configureStore";

// /**
//  * Return nodes with the the given data-test attribute
//  * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
//  * @param {string} val - Value of data-test attribute for search
//  * @returns {ShallowWrapper}
//  */

export const findByTestAttr = (wrapper: any, val: any) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const storeFactory = (initialState: any) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
