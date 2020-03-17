import { ERROR_RESET } from 'actionTypes';

export const resetError = () => dispatch => {
  dispatch({
    type: ERROR_RESET
  })
}