
import * as APIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";


// action creators --------------------

export const receiveCurrentUser = (user) => (
  {
    type: RECEIVE_CURRENT_USER,
    user: user
  }
);

export const receiveSessionErrors = (errors) => (
  {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  }
);


// thunks ------------------------------

export const login = (user) => {
  return function(dispatch){
    let success = (user) => dispatch(receiveCurrentUser(user));
    let failure = (errors) => dispatch(receiveSessionErrors(errors));

    return APIUtil.login(user).then(
      success,
      failure
    );
  }
}; // end login thunk

export const logout = () => {
  return function(dispatch){
    let success = () => dispatch(receiveCurrentUser(null));
    let failure = (errors) => dispatch(receiveSessionErrors(errors));

    return APIUtil.logout().then(
      success,
      failure
    );
  }
}; // end logout thunk

export const signup = (user) => {
  return function(dispatch){
    let success = (user) => dispatch(receiveCurrentUser(user));
    let failure = (errors) => dispatch(receiveSessionErrors(errors));

    return APIUtil.signup(user).then(
      success,
      failure
    );
  }
}; // end signup thunk
