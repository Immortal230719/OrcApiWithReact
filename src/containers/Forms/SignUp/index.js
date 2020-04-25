import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { useSpring, animated } from "react-spring";

import SignUpComponent from "components/Forms/SignUpForm/index";
import BackBtn from "components/Buttons/BackBtn";
import { loadSignUpForm } from "actions/sagaWatcherActions";
import { animateTrans, animateColor } from "utils/animation";

const useStyles = makeStyles({
  linkBtn: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background: "linear-gradient(120deg, rgb(22, 22, 22), rgb(0, 0, 0))",
  },
  formWrapper: {
    position: "relative",
    width: "600px",
    padding: "15px",
    borderRadius: "15px",
    color: "#fff",
  },
  animatedBox: {
    display: "block",
    height: "100vh",
    width: "34%",
    background: "rgb(205, 42, 255)",
    borderRadius: "15px",
    position: "absolute",
    top: "0",
    left: "0",
  },
});

const SignUpForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const [animate, setAnimate] = useState("animate");
  const { trans, shadow, back } = useSpring({
    from: {
      transform: "skew(20deg, 20deg) scale(1)",
      boxShadow: "2px 50px 50px rgb(205, 42, 255)",
    },
    trans: animateTrans(animate),
    shadow: animateColor(animate),
    back: animateColor(animate),
    config: { duration: 1300 },
  });

  const submitHandler = ({ name, email, password, password_confirmation }) => {
    if (password === password_confirmation) {
      dispatch(loadSignUpForm());
      dispatch(reset("signUp"));
      setSuccess(true);
    } else {
      console.log("error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <animated.div
          className={styles.animatedBox}
          style={{
            transform: trans.interpolate(
              (x, y, z) => `skew(${x}deg) scale(${y}) rotate(${z}deg)`
            ),
            boxShadow: shadow.interpolate(
              (x, y, z) => `2px 10px 25px rgb(${x}, ${y}, ${z})`
            ),
            background: back.interpolate((x, y, z) => `rgb(${x}, ${y}, ${z})`),
          }}
        />
      </div>
      {!success ? (
        <div className={styles.formWrapper}>
          <Typography
            align="center"
            variant="h3"
            component="h1"
            gutterBottom={true}
          >
            Sign Up
          </Typography>
          <Typography
            align="center"
            gutterBottom={true}
            variant="subtitle1"
            component="p"
          >
            Please, enter all Fields
          </Typography>
          <SignUpComponent
            animate1={() => setAnimate("animate1")}
            animate2={() => setAnimate("animate2")}
            animate3={() => setAnimate("animate3")}
            animate4={() => setAnimate("animate4")}
            onSubmit={submitHandler}
          />
          <Link className={styles.linkBtn} to="/">
            <BackBtn />
          </Link>
        </div>
      ) : (
        <div className={styles.formWrapper}>
          <Typography
            align="center"
            gutterBottom={true}
            variant="h5"
            component="h3"
          >
            Successfully registered. <br />
            Confirmation link has been sent to specified email. <br />
            Please, check your email.
          </Typography>
          <Link className={styles.linkBtn} to="/">
            <BackBtn text="Back" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
