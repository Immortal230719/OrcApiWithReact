import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { deleteAvatar, requestUploadAvatar } from 'actions/sagaWatcherActions';
import { errorAction } from 'reducers/error';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  tooltip: {
    zIndex: '1000',
    fontSize: '30px',
  },
  fileInput: {
    opacity: '0',
    height: '100%',
    width: '100%',
  },
  hoverWrapper: {
    position: 'absolute',
    zIndex: '10',
    top: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(42, 42, 42, 0.831)',
    borderRadius: '10px',
    transition: 'all 1.5s',
  },
  avatar: {
    height: '300px',
    width: '100%',
    maxHeight: '300px',
    borderRadius: '10px',
    transition: 'all 1.5s',
    '&:hover': {
      '& div': {
        display: 'block',
      },
    },
  },
  deleteIcon: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  uploadIcon: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '18px',
    transform: 'translate(-50%, -50%)',
    userSelect: 'none',
  },
  hoverEffect: {
    display: 'none',
  },
});

const AvatarUploader = ({ src }) => {
  const styles = useStyles();
  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const dropHandler = (e) => {
    const fileReader = new FileReader();
    const message =
      'Sorry! Something went wrong. Plaese, try to reload Application';

    const { files } = e.currentTarget;
    fileReader.onabort = () => {
      dispatch(errorAction({ error: true, message }));
    };
    fileReader.onerror = () => {
      dispatch(errorAction({ error: true, message }));
    };
    if (files.length === 1) {
      dispatch(requestUploadAvatar(files[0]));
      e.currentTarget.value = '';
    }
  };

  const deleteHandler = () => {
    dispatch(deleteAvatar());
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <input
          className={styles.fileInput}
          type='file'
          id='fileInput'
          name='fileInput'
          ref={fileInput}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={dropHandler}
          onChange={dropHandler}
        />
        <div className={styles.hoverEffect}>
          <div className={styles.hoverWrapper}>
            <Tooltip
              className={styles.tooltip}
              title='Delete Avatar'
              aria-label='Delete Avatar'
              arrow
            >
              <DeleteForeverOutlinedIcon
                onClick={deleteHandler}
                className={styles.deleteIcon}
              />
            </Tooltip>
            <Typography className={styles.text} variant='h3' color='inherit'>
              Drag & Drop <br />
              Your Photo
            </Typography>
            <Tooltip
              className={styles.tooltip}
              title='Add New Avatar'
              aria-label='Add New Avatar'
              arrow
            >
              <AddAPhotoOutlinedIcon
                onClick={() => fileInput.current.click()}
                className={styles.uploadIcon}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploader;

AvatarUploader.propTypes = {
  src: PropTypes.string.isRequired,
};
