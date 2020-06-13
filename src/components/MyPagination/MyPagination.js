import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MyPagination = ({
  currentPage = 1,
  pageChangeHandler,
  totalPage = 1,
}) => {
  if (totalPage < 2) return <div />;
  if (currentPage < 1) currentPage = 1;

  const handleSelect = (eventKey) => {
    pageChangeHandler(parseInt(eventKey.target.text));
  };

  const handleIncrement = () => {
    pageChangeHandler(currentPage + 1);
  };

  const handleDecrement = () => {
    pageChangeHandler(currentPage - 1);
  };

  const handleFirst = () => {
    pageChangeHandler(1);
  };

  const handleLast = () => {
    pageChangeHandler(totalPage);
  };

  let items = [],
    number;
  const start = Math.max(currentPage - 1, 2);

  items.push(
    <Pagination.Item
      key={1}
      active={1 === currentPage}
      onClick={currentPage === 1 ? null : handleSelect}
    >
      {1}
    </Pagination.Item>
  );

  if (currentPage > 3) items.push(<Pagination.Ellipsis key={-1} />);

  for (number = start; number < totalPage && number < start + 3; ++number) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={currentPage === number ? null : handleSelect}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (number <= start + 3 && number < totalPage)
    items.push(<Pagination.Ellipsis key={-2} />);

  if (totalPage !== 1)
    items.push(
      <Pagination.Item
        key={totalPage}
        active={totalPage === currentPage}
        onClick={currentPage === totalPage ? null : handleSelect}
      >
        {totalPage}
      </Pagination.Item>
    );

  return (
    <Pagination className="py-2">
      <Pagination.First disabled={currentPage === 1} onClick={handleFirst} />
      <Pagination.Prev disabled={currentPage === 1} onClick={handleDecrement} />
      {items}
      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={handleIncrement}
      />
      <Pagination.Last
        disabled={currentPage === totalPage}
        onClick={handleLast}
      />
    </Pagination>
  );
};

MyPagination.defaultProps = {
  currentPage: 1,
  totalPage: 0,
};

MyPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  pageChangeHandler: PropTypes.func,
};

export default MyPagination;
