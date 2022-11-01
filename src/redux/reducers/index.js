import { combineReducers } from 'redux';
import { quizReducer, questionReducer } from './quizReducer';
import addQuestionReducer from './addQuestionReducer';

const reducers = combineReducers({
  quiz: quizReducer,
  question: questionReducer,
  addQuestion: addQuestionReducer,
});

export default reducers;
