import { BACKDROP_TOGGLE } from 'actionTypes';

const initialState = {
  show: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case BACKDROP_TOGGLE:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};
