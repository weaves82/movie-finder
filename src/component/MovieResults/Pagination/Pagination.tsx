import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

import { getDispatchFunction } from "../../../helpers/helpersTs";

import { MoviesList } from "../../../component/movieList.model";
import { recentSearch } from "../../../component/recentSearch.model";

import "./Pagination.scss";

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const totalPages = useSelector(
    (state: MoviesList) => state.moviesList.totalPages
  );

  const { searchPayload, searchType } = useSelector(
    (state: recentSearch) => state.recentSearch
  );

  const dispatch = useDispatch();
  const dispatchFunction = getDispatchFunction(searchType)!;
  // const update = React.useCallback(
  //   () => dispatch(dispatchFunction(searchPayload, currentPage)),
  //   [dispatch, dispatchFunction, searchPayload, currentPage]
  // );

  const onClickNextHandler = (event: FormEvent) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
    dispatch(dispatchFunction(searchPayload, currentPage + 1));
  };

  const onClickPrevHandler = (event: FormEvent) => {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
    dispatch(dispatchFunction(searchPayload, currentPage - 1));
  };

  const renderPagination = totalPages > 0 && (
    <>
      <div data-test="pagination-page-details">
        Page {currentPage} of {totalPages}
      </div>
      {totalPages > 1 && (
        <div className="pagination__buttons" data-test="pagination-buttons">
          {totalPages > 1 && currentPage !== 1 && (
            <Button
              onClick={onClickPrevHandler}
              data-test="previous-button"
              title="Previous"
              icon
              className="reversed"
            >
              <Icon name="arrow left" />
            </Button>
          )}
          {totalPages > 1 && currentPage !== totalPages && (
            <Button
              title="Next"
              onClick={onClickNextHandler}
              data-test="next-button"
              icon
              className="reversed"
            >
              <Icon name="arrow right" />
            </Button>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="pagination" data-test="component-pagination">
      {renderPagination}
    </div>
  );
};

export default Pagination;
