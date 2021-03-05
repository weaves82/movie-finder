import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadInitialMovies } from "./actions/index";

import Logo from "./component/Logo/Logo";
import ResultsTotal from "./component/MovieResults/ResultsTotal/ResultsTotal";
import Pagination from "./component/MovieResults/Pagination/Pagination";
import ThemeSwitcher from "./component/ThemeSwitcher/ThemeSwitcher";
import MovieSearch from "./component/MovieSearch/MovieSearch";
import MovieRandomizer from "./component/MovieRandomizer/MovieRandomizer";
import MoviesListComp from "./component/MovieResults/MoviesList/MoviesList";
import { MemoizedMovieFilters } from "./component/MovieFilters/MovieFilters";
import { MoviesList } from "./component/movieList.model";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

function App() {
  const movies =
    useSelector((state: MoviesList) => state.moviesList.movies) || [];

  const dispatch = useDispatch();
  const loadMovies = React.useCallback(() => {
    return dispatch(loadInitialMovies());
  }, [dispatch]);

  React.useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <div id="app" className="light-theme">
      <div className="app-container">
        <header className="app-header">
          <Logo />
          <div className="app-header__ctas">
            <ThemeSwitcher />
            <MovieRandomizer />
            <MovieSearch />
            <MemoizedMovieFilters />
          </div>
        </header>
        <main className="app-content">
          <div className="app-results-actions">
            <ResultsTotal />
            <Pagination />
          </div>
          <div className="app-results-movies">
            <MoviesListComp movies={movies} />
          </div>
        </main>
      </div>
    </div>
    /*Modal*/
  );
}

export default App;
