import React from "react";
import Checkbox from "../../UI/Form/Checkbox/Checkbox";

import { getGenres } from "../../../helpers/helpersTs";

import {
  FilterProps,
  FilterArrayProps,
  GenreObject,
} from "../../filterForm.model";

import "./GenreFilter.scss";

const GenreFilter = (props: FilterProps) => {
  const [filters, setFilters] = React.useState<FilterArrayProps[]>([]);
  const [checkBoxes, setCheckBoxes] = React.useState<GenreObject[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const genres = await getGenres();
      let genreArray: FilterArrayProps[] = [];
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
