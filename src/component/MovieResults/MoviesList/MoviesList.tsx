import React from "react";
import { useSelector } from "react-redux";
import MovieItemComp from "./MovieItem/MovieItem";
import Modal from "../../UI/Modal/Modal";
import MovieItemModalComp from "./MovieItem/MovieItemModal";
import {
  getMovieDetails,
  convertToYear,
  getHeading,
} from "../../../helpers/helpersTs";
import { recentSearch } from "../../recentSearch.model";
import { MovieItem, MovieItemModal } from "../../movieList.model";

import "./MoviesList.scss";

const MoviesList: React.FC<{ movies: MovieItem[] }> = ({ movies }) => {
  const [modalMovieState, setModalMovieState] = React.useState<MovieItemModal>(
    {}
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  const { searchPayload, searchType } = useSelector((state: recentSearch) => {
    return state.recentSearch;
  });

  const onClickHandler = async (id: number) => {
    const movieDetails = await getMovieDetails(id);
    movieDetails && setModalMovieState(movieDetails);
    setModalOpen(true);
    //call endpoint for the movie to get more details and then pass thouse details into the modal
  };

  const onCloseHandler = () => {
    setModalOpen(false);
    //call endpoint for the movie to get more details and then pass thouse details into the modal
  };

  return (
    <>
      <h1>{getHeading(searchType, searchPayload)}</h1>
      <div className="movie-list">
        {movies.map((movie) => {
          return (
            <MovieItemComp
              onClick={onClickHandler}
              id={movie.id}
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={convertToYear(movie.release_date)}
            />
          );
        })}
        <Modal open={modalOpen} modalClosed={onCloseHandler}>
          <MovieItemModalComp movieDetails={modalMovieState} />
        </Modal>
      </div>
    </>
  );
};

export default MoviesList;
