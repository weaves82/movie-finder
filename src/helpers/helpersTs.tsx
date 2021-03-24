import axios from "axios";

import { MOVIE_DB_URL } from "../appConstants";
import { updateMoviesSearch, updateMoviesFilter } from "../actions/index";
import { searchType } from "../component/recentSearch.model";
import { CastItem, CrewItem } from "../component/movieList.model";
import {
  CertObject,
  GenreObject,
  FilterPropsObj,
} from "../component/filterForm.model";
const { REACT_APP_MOVIE_API } = process.env;

export const randomizeNumber = (maxValue = 0) => {
  return Math.floor(Math.random() * (maxValue + 1));
};

export const convertToYear = (stringdate = "") => {
  var mydate = new Date(stringdate);
  return mydate.getFullYear().toString();
};

// const getGenreTerm = async (id: any) => {
//   const genres = await getGenres();

//   const genreObject = genres.find((item) => item.id.toString() === id);

//   return genreObject?.name;
// };

const getSearchTerms = (object: any) => {
  let filtersArray: string[] = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (key === "genres") {
        object[key].map((item: GenreObject) => {
          return filtersArray.push(item.label);
        });
      }
      if (key === "certificates") {
        object[key].map((item: CertObject) => {
          return filtersArray.push(item.id);
        });
      }
      if (key === "year") {
        return filtersArray.push(object[key]);
      }
    }
  }

  return filtersArray.join(", ");
};

export const getHeading = (
  searchTypeInput: searchType,
  searchTerms: FilterPropsObj
) => {
  switch (searchTypeInput) {
    case searchType.Filter:
      const getSearchTerm = getSearchTerms(searchTerms);
      return `${
        getSearchTerm
          ? "Results for following filters: " + getSearchTerm
          : "No filters applied - Search All"
      }`;
    case searchType.Search:
      return `Results for "${searchTerms}"`;
    case searchType.Random:
      return "A totally random movie....any good?";
    default:
      return "Top 20 Trending Movies";
  }
};

export const getCertifications = async () => {
  const certificationsLookup = await axios.get(
    `${MOVIE_DB_URL}certification/movie/list?api_key=${REACT_APP_MOVIE_API}`
  );
  const ipLookup = await axios.get(`https://extreme-ip-lookup.com/json/`);
  const country = ipLookup.data.countryCode;
  const certificationsCountry =
    certificationsLookup.data.certifications[`${country}`];
  return certificationsCountry;
};

export const getGenres = async (): Promise<{ id: number; name: string }[]> => {
  const genreLookup = await axios.get(
    `${MOVIE_DB_URL}genre/movie/list?api_key=${REACT_APP_MOVIE_API}`
  );
  return genreLookup.data.genres;
};

export const getDispatchFunction = (searchTypeText: string) => {
  if (searchTypeText === searchType.Search) {
    return updateMoviesSearch;
  }
  if (searchTypeText === searchType.Filter) {
    return updateMoviesFilter;
  }
};

export const getCast = (castObject: CastItem[], number: number) => {
  const actors = castObject
    .sort((a, b) => {
      return a.order - b.order;
    })
    .slice(0, number)
    .map((actor) => {
      return actor.name;
    });
  return actors.join(", ");
};

export const getDirector = (crewObject: CrewItem[]) => {
  const director = crewObject
    .filter((crew) => crew.job === "Director")
    .map((person) => person.name);
  return director.join(", ");
};

export const getMovieDetails = async (id: number) => {
  try {
    // get movie details
    // const movieDetails = await axios.get(`${MOVIE_DB_URL}movie/${id}?api_key=${REACT_APP_MOVIE_API}`);
    // // get cast details
    // const castDetails = await axios.get(`${MOVIE_DB_URL}movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`);

    const movieDetails = axios.get(
      `${MOVIE_DB_URL}movie/${id}?api_key=${REACT_APP_MOVIE_API}`
    );
    // get cast details
    const castDetails = axios.get(
      `${MOVIE_DB_URL}movie/${id}/credits?api_key=${REACT_APP_MOVIE_API}`
    );
    const prm = [movieDetails, castDetails];
    //const [movie, cast] = await Promise.allSettled([movieDetails, castDetails])

    let mergeResults = {};

    await Promise.allSettled(prm).then((results) => {
      return results.map((result) => {
        return (mergeResults = {
          ...mergeResults,
          ...(result as PromiseFulfilledResult<any>).value.data,
        });
      });
    });

    return mergeResults;
  } catch (error) {
    alert(error);
  }
};
