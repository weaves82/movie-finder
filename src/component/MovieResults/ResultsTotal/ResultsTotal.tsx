import React from "react";
import { useSelector } from "react-redux";
import { MoviesList } from "../../../component/movieList.model";

const ResultsTotal: React.FC = () => {
  const moviesResults = useSelector(
    (state: MoviesList) => state.moviesList.totalResults
  );

  const results =
    moviesResults > 0 &&
    `${moviesResults} Result${moviesResults > 1 ? "s" : ""} found`;

  return <div data-test="component-results-total">{results}</div>;
};

export default ResultsTotal;
