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

export const setCurrentQuestionIndex = (value) => ({
  type: ActionTypes.SET_CURRENT_QUESTION_INDEX,
  payload: value,
});

export const updateRadioBool = (value) => ({
  type: ActionTypes.UPDATE_RADIO_BOOL,
  payload: value,
});

export const updateCheck = (value) => ({
  type: ActionTypes.UPDATE_CHECK,
  payload: value,
});

export const updateBlank = (value) => ({
  type: ActionTypes.UPDATE_BLANK,
  payload: value,
});

export const resetState = (value) => ({
  type: ActionTypes.RESET_STATE,
  payload: value,
})
