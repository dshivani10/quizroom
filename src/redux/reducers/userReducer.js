import ActionTypes from '../constants/action-types';

const userData = {
    email: '',
    google_id: '',
    name: 'Hello, Sign in',
    picture: '',
    role: '',
    logged: false
};

const userReducer = (state = userData, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER: {
        return {
      ...state,
      email: payload.email,
      google_id: payload.google_id,
      name: payload.name,
      picture: payload.picture,
      role: payload.role,
      logged: payload.logged
    }};
    default:
      return state;
  }
};

export default userReducer;
