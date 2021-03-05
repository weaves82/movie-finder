import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { updateMoviesFilter, actionTypes } from "../../actions/index";

import CertificationFilter from "../MovieFilters/CertificationFilter/CertificationFilter";
import GenreFilter from "../MovieFilters/GenreFilter/GenreFilter";
import YearFilter from "../MovieFilters/YearFilter/YearFilter";

import { Button } from "semantic-ui-react";

import { searchType } from "../recentSearch.model";

import "./MovieFilters.scss";

const MovieFilters = () => {
  const [formValues, setFormValues] = React.useState({});
  const [showFilters, setShowFilters] = React.useState(false);
  const [reset, setReset] = React.useState<boolean>(false);

  const dispatch = useDispatch();
  const updateMovie = React.useCallback(() => {
    dispatch(updateMoviesFilter(formValues));
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      searchData: formValues,
      searchType: searchType.Filter,
    });
  }, [dispatch, formValues]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMovie();
  };
  const onClickResetHandler = () => {
    setReset(true);
    setFormValues({});
  };
  const onChange = (value: any) => {
    setReset(false);
    setFormValues((prevState) => ({
      ...prevState,
      ...value,
    }));
  };
  const onClickFilterHandler = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div data-test="component-movie-filters" className="movie-filters">
      <Button
        data-test="show-filters-button"
        type="button"
        onClick={onClickFilterHandler}
      >
        {showFilters ? "Hide " : "Show "}Filters
      </Button>
      <div
        data-test="filters-form-container"
        className={
          showFilters ? "movie-filters__form" : "movie-filters__form hidden"
        }
      >
        <form onSubmit={onSubmitHandler}>
          <div className="movie-filters__filters">
            <div className="movie-filters__genres">
              <GenreFilter onChange={onChange} isReset={reset} />
            </div>
            <div className="movie-filters__additional">
              <CertificationFilter onChange={onChange} isReset={reset} />
              <YearFilter onChange={onChange} isReset={reset} />
              <Button
                data-test="submit-button"
                type="submit"
                className="reversed"
              >
                Search
              </Button>
              <Button
                data-test="reset-button"
                type="button"
                onClick={onClickResetHandler}
                className="reversed"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default MovieFilters;
export const MemoizedMovieFilters = React.memo(MovieFilters);
