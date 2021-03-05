import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { updateMoviesRandom } from "../../actions/index";
import { actionTypes } from "../../actions/index";
import { searchType } from "../recentSearch.model";

import { Button } from "semantic-ui-react";

const MovieRandomizer = () => {
  const dispatch = useDispatch();
  const updateMovie = React.useCallback(() => {
    dispatch(updateMoviesRandom());
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      searchData: {},
      searchType: searchType.Random,
    });
  }, [dispatch]);

  const onClickHandler = (e: FormEvent) => {
    e.preventDefault();
    updateMovie();
  };

  return (
    <div data-test="component-movie-randomizer">
      <Button onClick={onClickHandler}> Randomize Me a Movie </Button>
    </div>
  );
};

export default MovieRandomizer;
