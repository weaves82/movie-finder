import {
  actionTypes
} from "../actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = {},
  action
) => {
  switch (action.type) {
    case actionTypes.LOAD_INITIAL_MOVIES:
      return {
        ...state,
        movies: action.payload.results,
      };
    case actionTypes.UPDATE_MOVIES_RANDOM:

      return {
        ...state,
        movies: [action.payload],
          totalResults: null,
          totalPages: null
      };
    case actionTypes.UPDATE_MOVIES:

      const {
        results,
        total_pages,
        total_results
      } = action.payload

      return {
        ...state,
        movies: results,
          totalResults: total_results,
          totalPages: total_pages,
      };
    default:
      return state;
  }
};