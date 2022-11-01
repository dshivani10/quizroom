import ActionTypes from '../constants/action-types';

const quizInitialState = {
  allQuizzesData: [],
  currentQuiz: {
    name:'',
    _id:''
  },
  currentQuizQuestions: [],
  numberOfQuestions:0,
};
const questionInitialState = {};
export const quizReducer = (state = quizInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_ALL_QUIZZES:
      return {
        ...state,
        allQuizzesData: payload,
      };
    case ActionTypes.SET_CURRENT_QUIZ:{
      let {name, _id, questions} = payload;
      return {
        ...state,
        currentQuiz: {name,_id},
        currentQuizQuestions: questions,
        numberOfQuestions: questions.length
      };
    }
    default:
      return state;
  }
};

export const questionReducer = (state = questionInitialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
