import React from "react";
import { MovieItem } from "../../../movieList.model";
import "./MovieItem.scss";

const MoviesItem: React.FC<MovieItem> = (props) => {
  const onClickHandler = () => {
    props.onClick(props.id);
  };

  return (
    <div className="movie-item">
      <img
        alt={props.title}
        src={`https://image.tmdb.org/t/p/w200${props.poster_path}`}
        className="movie-item__image"
        onClick={onClickHandler}
      />
      <span className="movie-item__title">{props.title}</span>
      <span>{props.release_date}</span>
    </div>
  );
};

export default MoviesItem;
