import ActionTypes from '../constants/action-types';

export const changeType = (value) => ({
  type: ActionTypes.CHANGE_TYPE,
  payload: value,
});

export const addAllQuizzes = (value) => ({
  type: ActionTypes.ADD_ALL_QUIZZES,
  payload: value,
});

export const setCurrentQuiz = (value) => ({
  type: ActionTypes.SET_CURRENT_QUIZ,
  payload: value,
});