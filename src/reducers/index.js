import {
  combineReducers
} from "redux";
import moviesList from "./movieListReducer"
import recentSearch from "./recentSearchReducer"


export default combineReducers({
  moviesList,
  recentSearch
});