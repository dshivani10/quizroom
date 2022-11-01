import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setSelectedOption,
  toggleSubmit,
} from '../redux/actions/quizActions';
import '../css/QuizCss.css';

function OptionsComponent({ question, checkedOptionId }) {
  const dispatch = useDispatch();
  function selectedOption(event) {
    dispatch(setSelectedOption(Number(event.target.value)));
    dispatch(toggleSubmit(false));
  }
  return (
    question.options
      ? question.options.map((optionItem) => (
        <div key={optionItem.id}>
          <div className="option-title">
            <label htmlFor={`option-input${optionItem.id}`} className="option-label">
              <input
                id={`option-input${optionItem.id}`}
                disabled={optionItem.status !== 'unset'}
                className={`option-input-${question.type}`}
                type={question.type === 'radio' || question.type === 'bool' ? 'radio' : 'checkbox'}
                name="option_title"
                value={optionItem.id}
                checked={checkedOptionId === optionItem.id}
                onChange={selectedOption}
              />
              {optionItem.option}
            </label>
            {(optionItem.status === 'correct') || (checkedOptionId === -1 && question.correctOptionIds.indexOf(optionItem.id) >= 0) ? (
              <p className="option-result correct-option">Correct</p>
            ) : (
              ''
            )}
            {optionItem.status === 'incorrect' ? (
              <p className="option-result incorrect-option">Incorrect</p>
            ) : (
              ''
            )}
          </div>
        </div>
      ))
      : ''
  );
}

export default OptionsComponent;
