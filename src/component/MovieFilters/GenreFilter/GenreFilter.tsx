import React from "react";
import Checkbox from "../../UI/Form/Checkbox/Checkbox";

import { getGenres } from "../../../helpers/helpersTs";

import {
  filterProps,
  filterArrayProps,
  genreObject,
} from "../../filterForm.model";

import "./GenreFilter.scss";

const GenreFilter = (props: filterProps) => {
  const [filters, setFilters] = React.useState<filterArrayProps[]>([]);
  const [checkBoxes, setCheckBoxes] = React.useState<genreObject[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const genres = await getGenres();
      let genreArray: filterArrayProps[] = [];
      genres.map((item) => {
        genreArray.push({
          id: item.id.toString(),
          label: item.name,
        });
        return genreArray;
      });
      setFilters(genreArray);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    props.onChange({ genres: checkBoxes });
  }, [checkBoxes]);

  React.useEffect(() => {
    props.isReset && setCheckBoxes([]);
  }, [props.isReset]);

  const onChangeHandler = (id: string, isClicked: boolean, label: string) => {
    isClicked
      ? setCheckBoxes([...checkBoxes, { label: label, id: id }])
      : setCheckBoxes(checkBoxes.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3>Genres</h3>
      <div className="movie-filters__genres-collection">
        {filters.map((item) => {
          return (
            <Checkbox
              key={item.id}
              onChange={onChangeHandler}
              label={item.label}
              id={item.id}
              isReset={props.isReset}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GenreFilter;
