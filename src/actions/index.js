import axios from 'axios';

import {
  randomizeNumber,
} from '../helpers/helpersTs'
import {
  getFilterQuery,
} from './helpers'
import {
  MOVIE_DB_URL
} from '../appConstants'



const {
  REACT_APP_MOVIE_API
} = process.env

export const actionTypes = {
  UPDATE_MOVIES: "UPDATE_MOVIES",
  UPDATE_MOVIES_RANDOM: "UPDATE_MOVIES_RANDOM",
  LOAD_INITIAL_MOVIES: "LOAD_MOVIES",
  SET_SEARCH_TERM: "SET_SEARCH_TERM"
}

export const loadInitialMovies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${MOVIE_DB_URL}trending/movie/day?api_key=${REACT_APP_MOVIE_API}`
      );

      dispatch({
        type: actionTypes.LOAD_INITIAL_MOVIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateMoviesSearch = (searchWord, page = 1) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${MOVIE_DB_URL}search/movie?api_key=${REACT_APP_MOVIE_API}&language=en-US&query=${searchWord}&include_adult=false&page=${page}`
      );
      dispatch({
        type: actionTypes.UPDATE_MOVIES,
        payload: response.data,
      });
    } catch (err) {
      alert(err); // TypeError: failed to fetch
    }
  }

}

export const getLatestMovieId = async () => {
  try {
    const latestMovie = await axios.get(`${MOVIE_DB_URL}movie/latest?api_key=${REACT_APP_MOVIE_API}`);
    return latestMovie.data.id
  } catch (error) {
    alert(error);
  }
}

export const updateMoviesRandom = () => {
  // get the latest movie and it's id
  // randomize a number between it and 0
  // get movie with that id
  return async (dispatch) => {

    //store locally
    const latestMovieId = await getLatestMovieId()
    const randomMovieId = randomizeNumber(latestMovieId)
    try {
      const randomMovieResponse = await axios.get(`${MOVIE_DB_URL}movie/${randomMovieId}?api_key=${REACT_APP_MOVIE_API}`)
      randomMovieResponse.data.adult && dispatch(updateMoviesRandom());
      !randomMovieResponse.data.adult && dispatch({
        type: actionTypes.UPDATE_MOVIES_RANDOM,
        payload: randomMovieResponse.data,
      });
    } catch (error) {

      const {
        status_code
      } = error.response.data

      if (status_code === 34) {
        dispatch(updateMoviesRandom())
      }
    }
  }
}

export const updateMoviesFilter = (filterObj = {}, page = 1) => {

  return async (dispatch) => {
    try {
      //loop through object
      //split into the 3 properties and create correct parameter
      const queryFilters = getFilterQuery(filterObj)
      const response = await axios.get(
        `${MOVIE_DB_URL}discover/movie?api_key=${REACT_APP_MOVIE_API}&language=en-US&include_adult=false${queryFilters}&page=${page}`
      );

      dispatch({
        type: actionTypes.UPDATE_MOVIES,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  }
}