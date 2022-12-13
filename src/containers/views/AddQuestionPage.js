import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../css/AddQuestion.css';
import {
  changeType,
} from '../../redux/actions/quizActions';
import AppConstants from '../../configs/constants';

function AddQuestionPage() {
  const questionType = useSelector((state) => state.addQuestion.questionType);
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const questionRadio = {
    type: 'radio',
    title: '',
    correctOptionId: 0,
    options: [
      {
        value: 1,
        label: '',
        status: 'unset',
      },
      {
        value: 2,
        label: '',
        status: 'unset',
      },
      {
        value: 3,
        label: '',
        status: 'unset',
      },
      {
        value: 4,
        label: '',
        status: 'unset',
      },
    ],
  };
  const questionCheck = {
    type: 'check',
    title: '',
    correctOptionIds: [],
    options: [
      {
        value: 1,
        label: '',
        status: 'unset',
      },
      {
        value: 2,
        label: '',
        status: 'unset',
      },
      {
        value: 3,
        label: '',
        status: 'unset',
      },
      {
        value: 4,
        label: '',
        status: 'unset',
      },
    ],
  };
  const questionBool = {
    title: '',
    type: 'bool',
    correctOptionId: 0,
    options: [
      {
        value: 1,
        label: 'True',
        status: 'unset',
      },
      {
        value: 2,
        label: 'False',
        status: 'unset',
      },
    ],
  };
  const questionBlank = {
    title: '',
    type: 'blank',
    correctAnswer: '',
  };
  function selectTye(e, val) {
    dispatch(changeType(val));
  }
  function questionTitle(event, type) {
    if (type === 'radio') {
      questionRadio.title = event.target.value;
    } else if (type === 'check') {
      questionCheck.title = event.target.value;
    } else if (type === 'bool') {
      questionBool.title = event.target.value;
    } else if (type === 'blank') {
      questionBlank.title = event.target.value;
    }
  }
  function optionText(val, id, type) {
    if (type === 'radio') {
      questionRadio.options[(id - 1)].label = val;
    } else if (type === 'check'){
      questionCheck.options[(id - 1)].label = val;
    }
  }
  function optionSelected(event, type) {
    if (type === 'radio' || type === 'bool') {
      questionRadio.correctOptionId = event.target.value;
    } else if (type === 'check') {
      questionCheck.correctOptionIds.push(event.target.value);
    } else if (type === 'blank') {
      questionBlank.correctAnswer = event.target.value;
    }
  }
  async function submitQuestion(type) {
    if (type === 'radio') {
      await axios.post(`${AppConstants.API_ENDPOINT}/api/quizzes/${quizId}/question`, questionRadio);
    } else if (type === 'check') {
      await axios.post(`${AppConstants.API_ENDPOINT}/api/quizzes/${quizId}/question`, questionCheck);
    } else if (type === 'bool') {
      await axios.post(`${AppConstants.API_ENDPOINT}/api/quizzes/${quizId}/question`, questionBool);
    } else if (type === 'blank') {
      await axios.post(`${AppConstants.API_ENDPOINT}/api/quizzes/${quizId}/question`, questionBlank);
    }
    alert('Question added successfully !');
  }
  return (
    <div className="main-container">
      <div className="question-type">
        <div tabIndex="0" role="button" className="question-type-item" onClick={(e) => selectTye(e, 'radio')} onKeyDown={(e) => selectTye(e, 'radio')}>
          <img alt="" className="question-type-icon" src="../../radio.png" />
          <p className={`question-type-text ${questionType === 'radio' ? 'selected-type' : ''}`}>Choose the correct</p>
        </div>
        <div tabIndex="0" role="button" className="question-type-item" onClick={(e) => selectTye(e, 'check')} onKeyDown={(e) => selectTye(e, 'radio')}>
          <img alt="" className="question-type-icon" src="../../check.png" />
          <p className={`question-type-text ${questionType === 'check' ? 'selected-type' : ''}`}>Multiple choice</p>
        </div>
        <div tabIndex="0" role="button" className="question-type-item" onClick={(e) => selectTye(e, 'bool')} onKeyDown={(e) => selectTye(e, 'radio')}>
          <img alt="" className="question-type-icon" src="../../testing.png" />
          <p className={`question-type-text ${questionType === 'bool' ? 'selected-type' : ''}`}>True/False</p>
        </div>
        <div tabIndex="0" role="button" className="question-type-item" onClick={(e) => selectTye(e, 'blank')} onKeyDown={(e) => selectTye(e, 'radio')}>
          <img alt="" className="question-type-icon" src="../../minus.png" />
          <p className={`question-type-text ${questionType === 'blank' ? 'selected-type' : ''}`}>Fill the blank</p>
        </div>
      </div>
      { questionType === 'radio'
        ? (
          <div className="question-details">
            <div className="question-title-box">
              <label className="question-title-label" htmlFor="question-text">
                Question:
                <input className="question-input" onChange={(e) => questionTitle(e, 'radio')} id="question-text" type="text" />
              </label>
            </div>
            <div className="question-options-box">
              {
                questionRadio.options.map((option) => (
                  <label key={option.value} htmlFor={`option-${option.value}`}>
                    <div className="optionitem" id={`option-${option.value}`}>
                      <input className="input-icon-radio" value={option.value} onChange={(e) => optionSelected(e, 'radio')} type="radio" />
                      <input className="option-input-text" onChange={(e) => optionText(e.target.value, option.value, 'radio')} placeholder={`Option ${option.value}`} type="text" />
                    </div>
                  </label>
                ))
              }
            </div>
            <div className="submit-button-container">
              <button className="submit-button" type="submit" onClick={() => submitQuestion('radio')}>Submit</button>
            </div>
          </div>
        ) : ''}
      { questionType === 'check'
        ? (
          <div className="question-details">
            <div className="question-title-box">
              <label className="question-title-label" htmlFor="question-text">
                Question:
                <input className="question-input" onChange={(e) => questionTitle(e, 'check')} id="question-text" type="text" />
              </label>
            </div>
            <div className="question-options-box">
              {
                questionCheck.options.map((option) => (
                  <label key={option.value} htmlFor={`option-${option.value}`}>
                    <div className="optionitem" id={`option-${option.value}`}>
                      <input className="input-icon-check" value={option.value} onChange={(e) => optionSelected(e, 'check')} type="checkbox" />
                      <input className="option-input-text" onChange={(e) => optionText(e.target.value, option.value, 'check')} placeholder={`Option ${option.value}`} type="text" />
                    </div>
                  </label>
                ))
              }
            </div>
            <div className="submit-button-container">
              <button className="submit-button" type="submit" onClick={() => submitQuestion('check')}>Submit</button>
            </div>
          </div>
        ) : ''}
      { questionType === 'bool'
        ? (
          <div className="question-details">
            <div className="question-title-box">
              <label className="question-title-label" htmlFor="question-text">
                Question:
                <input className="question-input" onChange={(e) => questionTitle(e, 'bool')} id="question-text" type="text" />
              </label>
            </div>
            <div className="question-options-box">
              {
                questionBool.options.map((option) => (
                  <label key={option.value} htmlFor={`option-${option.value}`}>
                    <div className="optionitem" id={`option-${option.value}`}>
                      <input className="input-icon-radio" value={option.value} onChange={(e) => optionSelected(e, 'bool')} type="radio" />
                      <span>{option.label}</span>
                    </div>
                  </label>
                ))
              }
            </div>
            <div className="submit-button-container">
              <button className="submit-button" type="submit" onClick={() => submitQuestion('bool')}>Submit</button>
            </div>
          </div>
        ) : ''}
      { questionType === 'blank'
        ? (
          <div className="question-details">
            <div className="question-title-box">
              <label className="question-title-label" htmlFor="question-text">
                Question:
                <input className="question-input" onChange={(e) => questionTitle(e, 'blank')} id="question-text" type="text" />
              </label>
            </div>
            <div className="question-answer-box">
              <label className="question-title-label" htmlFor="question-answer">
                Answer:
                <input className="question-input" onChange={(e) => optionSelected(e, 'blank')} id="question-answer" type="text" />
              </label>
            </div>
            <div className="submit-button-container">
              <button className="submit-button" type="submit" onClick={() => submitQuestion('blank')}>Submit</button>
            </div>
          </div>
        ) : ''}
    </div>
  );
}

export default AddQuestionPage;
