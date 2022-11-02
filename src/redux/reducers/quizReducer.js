import ActionTypes from '../constants/action-types';

const quizInitialState = {
  allQuizzesData: [],
  currentQuiz: {
    topic:'',
    subtopic:'',
    _id:''
  },
  currentQuizQuestions: [],
  numberOfQuestions:0,
  currentQuestion:{},
  currentQuestionIndex:0,
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
      let {topic, subtopic, _id, questions} = payload;
      let questionsList = questions.map((e) => {
        if(e.type === 'radio' || e.type === 'bool'){
          return {...e, checkedOptionId: 0}
        } else if(e.type === 'check'){
          return {...e, checkedOptionIds: []}
        } else {
          return {...e, typedAnswer:''}
        }
      })
      return {
        ...state,
        currentQuiz: {topic, subtopic, _id},
        currentQuizQuestions: [...questionsList],
        numberOfQuestions: questionsList.length,
        currentQuestion: {...questionsList[0]},
      };
    }
    case ActionTypes.SET_CURRENT_QUESTION_INDEX:{
      const {currentQuizQuestions} = state;
      return {
        ...state,
        currentQuestionIndex:payload,
        currentQuestion: {...currentQuizQuestions[payload]},
      }
    }
    case ActionTypes.UPDATE_RADIO_BOOL:{
      let {index, value} = payload;
      let list = state.currentQuizQuestions;
      list[index].checkedOptionId = value;
      return {
        ...state,
        currentQuizQuestions: [...list],
        currentQuestion: {...list[index]}
      }
    }
    case ActionTypes.UPDATE_CHECK:{
      let {index, value} = payload;
      let checkedOptionIds = state.currentQuizQuestions[index].checkedOptionIds;
      if(!checkedOptionIds.includes(value)){
        checkedOptionIds.push(value);
      }else{
        checkedOptionIds.splice(checkedOptionIds.indexOf(value), 1);
      }
      let list = state.currentQuizQuestions;
      list[index].checkedOptionIds = [...checkedOptionIds];
      return {
        ...state,
        currentQuizQuestions: [...list],
        currentQuestion: {...list[index]}
      }
    }
    case ActionTypes.UPDATE_BLANK:{
      let {index, value} = payload;
      let list = state.currentQuizQuestions;
      list[index].typedAnswer = value;
      return {
        ...state,
        currentQuizQuestions: [...list],
        currentQuestion: {...list[index]}
      }
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
