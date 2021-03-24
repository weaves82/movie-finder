import React from "react";
// import { getCast, getDirector } from "../../../../helpers/helpers";
import { MovieItemModal } from "../../../movieList.model";
// import { convertToYear } from "../../../../helpers/helpers";
import {
  convertToYear,
  getCast,
  getDirector,
} from "../../../../helpers/helpersTs";
import "./MovieItemModal.scss";

const MovieItemModalComp: React.FC<{ movieDetails: MovieItemModal }> = (
  props
) => {
  const {
    title = "",
    crew = [],
    cast = [],
    poster_path = "",
    overview = "",
    release_date = "",
    genres = [],
  } = props.movieDetails;
  const releaseYear = convertToYear(release_date);
  const castList = cast.length > 0 && getCast(cast, 3);
  const crewList = crew.length > 0 && getDirector(crew);
  const getGenreList = genres.map((genre) => genre.name).join(", ");
  return (
    <div className="movie-item-modal">
      <div className="movie-item-modal__image">
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          className="movie-item__image"
        />
      </div>
      <div className="movie-item-modal__details">
        <span className="movie-item-modal__title">
          {title} <span>({releaseYear})</span>
        </span>
        <span className="movie-item-modal__info">
          Director: <strong>{crewList}</strong>{" "}
        </span>
        <span className="movie-item-modal__info">
          Cast: <strong>{castList}</strong>{" "}
        </span>

        <span className="movie-item-modal__info">
          Genre: <strong>{getGenreList}</strong>{" "}
        </span>

        <p className="movie-item-modal__description">{overview}</p>
      </div>
    </div>
  );
};

export default MovieItemModalComp;
