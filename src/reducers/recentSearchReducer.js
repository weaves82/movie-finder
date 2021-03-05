import {
  actionTypes
} from "../actions/index";

const recentSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchPayload: action.searchData,
          searchType: action.searchType
      }
      default:
        return state
  }
}

export default recentSearchReducer;