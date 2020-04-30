import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring";

import lotus from "components/BackgroundAnimation/lotus.svg";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    top: "0",
    opacity: "0.3",
  },
  lotus: {
    height: "70%",
    width: "50%",
  },
});

const BackgroundAnimation = ({ scrollTop }) => {
  const styles = useStyles();
  let scale = 1 + scrollTop / 1000;

  const trans = useSpring({
    transform: `scale(${scale})`,
    from: {
      transform: "scale(1)",
    },
    config: { duration: 0 },
  });

  return (
    <div className={styles.wrapper}>
      <animated.img
        className={styles.lotus}
        style={trans}
        src={lotus}
        alt="lotus"
      />
    </div>
  );
};

export default BackgroundAnimation;
