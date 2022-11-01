import ActionTypes from '../constants/action-types';

export const setQuiz = (questions) => ({
  type: ActionTypes.SET_QUIZ,
  payload: questions,
});

export const updateQuiz = (questions) => ({
  type: ActionTypes.UPDATE_QUIZ,
  payload: questions,
});

export const setCurrentQuestion = (question) => ({
  type: ActionTypes.SET_CURRENT_QUESTION,
  payload: question,
});

export const setQuizScore = (score) => ({
  type: ActionTypes.SET_QUIZ_SCORE,
  payload: score,
});

export const setSelectedOption = (option) => ({
  type: ActionTypes.SET_SELECTED_OPTION,
  payload: option,
});

export const setCurrentIndex = (index) => ({
  type: ActionTypes.SET_CURRENT_INDEX,
  payload: index,
});

export const toggleSubmit = (value) => ({
  type: ActionTypes.TOGGLE_SUBMIT,
  payload: value,
});

export const setOptionStatus = (status) => ({
  type: ActionTypes.SET_OPTION_STATUS,
  payload: status,
});

export const changeType = (value) => ({
  type: ActionTypes.CHANGE_TYPE,
  payload: value,
});

export const addAllQuizzes = (value) => ({
  type: ActionTypes.ADD_ALL_QUIZZES,
  payload: value,
});
