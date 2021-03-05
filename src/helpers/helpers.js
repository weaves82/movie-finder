import axios from 'axios';

import {
  MOVIE_DB_URL
} from '../appConstants'
import {
  updateMoviesSearch,
  updateMoviesFilter,
} from "../actions/index";
import {
  searchType
} from "../component/recentSearch.model";
const {
  REACT_APP_MOVIE_API
} = process.env


export const randomizeNumber = (maxValue = 0) => {
  return Math.floor(Math.random() * (maxValue + 1))
}

export const convertToYear = (stringdate = '') => {
  var mydate = new Date(stringdate);
  return mydate.getFullYear().toString()
}

export const getCertifications = async () => {
  const certificationsLookup = await axios.get(`${MOVIE_DB_URL}certification/movie/list?api_key=${REACT_APP_MOVIE_API}`)
  const ipLookup = await axios.get(`https://extreme-ip-lookup.com/json/`)
  const country = ipLookup.data.countryCode
  const certificationsCountry = certificationsLookup.data.certifications[`${country}`]
  return certificationsCountry
}

export const getGenres = async () => {
  const genreLookup = await axios.get(`${MOVIE_DB_URL}genre/movie/list?api_key=${REACT_APP_MOVIE_API}`)
  return genreLookup.data.genres
}

export const getDispatchFunction = (searchTypeText) => {
  if (searchTypeText === searchType.Search) {
    return updateMoviesSearch
  }
  if (searchTypeText === searchType.Filter) {
    return updateMoviesFilter
  }
}

export const getCast = (castObject, number) => {
  const actors = castObject
    .sort((a, b) => {
      return a.order - b.order
    })
    .slice(0, number).map((actor) => {
      return actor.name
    })
  return actors.join(', ')
}

export const getDirector = (crewObject) => {
  const director = crewObject
    .filter((crew) => crew.job === 'Director')
    .map((person) => person.name)
  return director.join(', ')
}

export const getMovieDetails = async (id) => {
  try {
    // get movie details
    // const movieDetails = await axios.get(`${MOVIE_DB_URL}movie/${id}?api_key=${REACT_APP_MOVIE_API}`);
    // // get cast details
    // const castDetails = await axios.get(`${MOVIE_DB_URL}movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`);

    const movieDetails = axios.get(`${MOVIE_DB_URL}movie/${id}?api_key=${REACT_APP_MOVIE_API}`);
    // get cast details
    const castDetails = axios.get(`${MOVIE_DB_URL}movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`);

    const [movie, cast] = await Promise.allSettled([movieDetails, castDetails]);

    const mergeResults = {
      ...movie.value.data,
      ...cast.value.data
    }

    return mergeResults
  } catch (error) {
    alert(error);
  }
}