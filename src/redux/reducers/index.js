import { combineReducers } from 'redux';
import { quizReducer } from './quizReducer';
import addQuestionReducer from './addQuestionReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  quiz: quizReducer,
  addQuestion: addQuestionReducer,
  user: userReducer,
});

export default reducers;
