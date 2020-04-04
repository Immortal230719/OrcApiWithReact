export const animateTrans = stateOfAnimate => {
  switch (stateOfAnimate) {
    case "animate1":
      return [20, 1.8, -45];
    case "animate2":
      return [40, 2.4, -115];
    case "animate3":
      return [-10, 2.2, 70];
    case "animate4":
      return [10, 2, 170];
    case "animate":
      return [20, 2, 0];
    default:
      return [20, 2, 0];
  }
};

export const animateColor = stateOfAnimate => {
  switch (stateOfAnimate) {
    case "animate1":
      return [31, 176, 233];
    case "animate2":
      return [46, 175, 29];
    case "animate3":
      return [213, 82, 212];
    case "animate4":
      return [149, 125, 15];
    case "animate":
      return [143, 14, 121];
    default:
      return [149, 125, 15];
  }
};
