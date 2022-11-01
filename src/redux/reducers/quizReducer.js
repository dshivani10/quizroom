import ActionTypes from '../constants/action-types';

const quizInitialState = {
  allQuizzesData: [],
  questionsList: {},
  questionsLength: 0,
  quizScore: 0,
};
const questionInitialState = {
  currentQuestion: {},
  currentIndex: 0,
  checkedOptionIds: [],
  submitDisabled: true,
  questionStatus: 'unset',
  verifiedAnswer: false,
};
export const quizReducer = (state = quizInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_QUIZ:
      return {
        ...state,
        questionsList: payload,
        questionsLength: payload.questions.length,
      };
    case ActionTypes.ADD_ALL_QUIZZES:
      return {
        ...state,
        allQuizzesData: payload,
      };
    case ActionTypes.UPDATE_QUIZ: {
      const { questionsList } = state;
      const newQuestionsList = questionsList.questions.map((question) => {
        if (question.id === payload.id) {
          return payload;
        }
        return question;
      });
      const updatedQuestionsList = { ...questionsList, questions: newQuestionsList };
      return {
        ...state,
        questionsList: updatedQuestionsList,
      };
    }
    case ActionTypes.SET_QUIZ_SCORE: {
      const { quizScore: score } = state;
      return {
        ...state,
        quizScore: (score + 1),
      };
    }
    default:
      return state;
  }
};

export const questionReducer = (
  state = questionInitialState,
  { type, payload },
) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_QUESTION:
      return {
        ...state, currentQuestion: payload, questionStatus: 'unset', verifiedAnswer: false,
      };
    case ActionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: payload };
    case ActionTypes.SET_SELECTED_OPTION:
    {
      const { checkedOptionIds } = state;
      return { ...state, checkedOptionIds: checkedOptionIds.push(payload) };
    }
    case ActionTypes.TOGGLE_SUBMIT:
      return { ...state, submitDisabled: payload };
    case ActionTypes.SET_OPTION_STATUS: {
      const { currentQuestion } = state;
      let setStatus = 'unset';
      if (payload.status === 'correct') {
        setStatus = 'disable';
      }
      const newOptions = currentQuestion.options.map((option) => {
        if (option.id === payload.id) {
          return { ...option, status: payload.status };
        }
        if (option.status === 'unset') {
          return { ...option, status: setStatus };
        }
        return option;
      });
      const newQuestion = { ...currentQuestion, options: newOptions };
      return {
        ...state,
        currentQuestion: newQuestion,
        questionStatus: setStatus,
        verifiedAnswer: true,
      };
    }
    default:
      return state;
  }
};
