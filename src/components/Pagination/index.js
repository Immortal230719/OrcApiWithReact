import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { memoProducts, getPage } from 'selectors';

const useStyles = makeStyles({
  wrapper: {
    zIndex: 1,
    position: 'relative',
    '& ul': {
      justifyContent: 'center',
    },
  },
});

const Paginator = ({ onChange }) => {
  const styles = useStyles();
  const { meta } = useSelector(memoProducts);
  const currentPage = useSelector(getPage);

  return (
    <div className={styles.wrapper}>
      <Pagination
        color='primary'
        className={`${styles.wrapper} ${styles.root}`}
        count={meta.last_page}
        shape='rounded'
        hidePrevButton
        hideNextButton
        onChange={onChange}
        renderItem={(item) => {
          const { color, onClick, disabled, page, shape, type, variant } = item;
          let { selected } = item;
          selected = Boolean(page === currentPage);
          return (
            <PaginationItem
              aria-label={item['aria-label']}
              size='large'
              selected={selected}
              color={color}
              onClick={onClick}
              disabled={disabled}
              page={page}
              shape={shape}
              type={type}
              variant={variant}
            />
          );
        }}
      />
    </div>
  );
};

export default Paginator;

Paginator.propTypes = {
  onChange: PropTypes.func.isRequired,
};
