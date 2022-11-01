import ActionTypes from '../constants/action-types';

const addQuestion = {
  questionType: 'radio',
};

const addQuestionReducer = (state = addQuestion, { type, payload }) => {
  switch (type) {
    case ActionTypes.CHANGE_TYPE: return {
      ...state,
      questionType: payload,
    };
    default:
      return state;
  }
};

export default addQuestionReducer;
