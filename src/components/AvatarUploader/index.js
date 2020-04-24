import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { deleteAvatar } from "actions/sagaWatcherActions";
import { requestUploadAvatar } from "actions/sagaWatcherActions";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
  },
  fileInput: {
    opacity: "0",
    height: "100%",
    width: "100%",
  },
  hoverWrapper: {
    position: "absolute",
    zIndex: "10000",
    top: "0",
    width: "100%",
    height: "100%",
    background: "rgba(42, 42, 42, 0.831)",
    borderRadius: "10px",
    transition: "all 1.5s",
  },
  avatar: {
    height: "300px",
    width: "100%",
    maxHeight: "300px",
    borderRadius: "10px",
    transition: "all 1.5s",
    "&:hover": {
      "& div": {
        display: "block",
      },
    },
  },
  deleteIcon: {
    position: "absolute",
    top: "15px",
    left: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  uploadIcon: {
    position: "absolute",
    bottom: "15px",
    right: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "18px",
    transform: "translate(-50%, -50%)",
  },
  hoverEffect: {
    display: "none",
  },
});

const AvatarUploader = ({ hovered, className, src, ...props }) => {
  const styles = useStyles();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  let fileReader = new FileReader();

  const dropHandler = (e) => {
    const files = e.currentTarget.files;
    fileReader.onabort = () => {
      console.log("File reading error!");
    };
    fileReader.onerror = () => {
      console.log("Reading error!");
    };
    if (files.length === 1) {
      dispatch(requestUploadAvatar(files[0]));
      e.currentTarget.value = "";
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
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        {...props}
      >
        <input
          className={styles.fileInput}
          type="file"
          id="fileInput"
          name="fileInput"
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
            <DeleteForeverOutlinedIcon
              onClick={deleteHandler}
              className={styles.deleteIcon}
            />
            <Typography className={styles.text} variant="h3" color="inherit">
              Drag & Drop <br />
              Your Photo
            </Typography>
            <AddAPhotoOutlinedIcon
              onClick={() => fileInput.current.click()}
              className={styles.uploadIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUploader;
