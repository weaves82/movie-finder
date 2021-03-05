import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
// import axios from "axios";
import { updateMoviesSearch } from "../../actions/index";

import { actionTypes } from "../../actions/index";
import { searchType } from "../recentSearch.model";

const MovieSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const dispatch = useDispatch();
  const updateMovie = React.useCallback(() => {
    dispatch(updateMoviesSearch(searchTerm));
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      searchData: searchTerm,
      searchType: searchType.Search,
    });
  }, [dispatch, searchTerm]);

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    updateMovie();
  };

  return (
    <div data-test="component-movie-search">
      <form onSubmit={onSubmitHandler}>
        <input
          aria-label="Search Movies"
          data-test="input-box"
          placeholder="Search here..."
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button
          active={searchTerm.length > 0}
          disabled={searchTerm.length === 0}
          title="Submit"
          data-test="submit-button"
          icon
          type="submit"
        >
          <Icon name="search" />
        </Button>
      </form>
    </div>
  );
};

export default MovieSearch;
