import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  setQuiz,
  setCurrentQuestion,
  setSelectedOption,
  setCurrentIndex,
  toggleSubmit,
  setOptionStatus,
  setQuizScore,
  updateQuiz,
} from '../redux/actions/quizActions';
import '../css/QuizCss.css';
import OptionsComponent from './OptionsComponent';

function QuestionsList() {
  const currentQuestion = useSelector(
    (state) => state.question.currentQuestion,
  );
  const currentIndex = useSelector((state) => state.question.currentIndex);
  const quizData = useSelector((state) => state.quiz.questionsList);
  const questionsLength = useSelector((state) => state.quiz.questionsLength);
  const quizScore = useSelector((state) => state.quiz.quizScore);
  const checkedOptionId = useSelector(
    (state) => state.question.checkedOptionId,
  );
  const submitDisabled = useSelector((state) => state.question.submitDisabled);
  const questionStatus = useSelector((state) => state.question.questionStatus);
  const verifiedAnswer = useSelector((state) => state.question.verifiedAnswer);
  const { quizId } = useParams();
  const dispatch = useDispatch();
  async function fetchData(qid) {
    const response = await axios.get(`https://nisum-quizroom.herokuapp.com/api/quizzes/${qid}`);
    const quiz = response.data;
    dispatch(setQuiz(quiz));
    dispatch(setCurrentQuestion(quiz.questions[0]));
  }
  useEffect(() => {
    fetchData(quizId);
  }, []);
  function nextQuestion() {
    if (currentIndex < questionsLength - 1) {
      dispatch(setCurrentQuestion(quizData.questions[currentIndex + 1]));
      dispatch(setCurrentIndex(currentIndex + 1));
      dispatch(setSelectedOption(0));
      dispatch(toggleSubmit(true));
      dispatch(updateQuiz(currentQuestion));
    } else if (currentIndex < questionsLength) {
      dispatch(setCurrentIndex(currentIndex + 1));
      dispatch(updateQuiz(currentQuestion));
    }
  }
  function checkAnswer() {
    if (currentQuestion.correctOptionIds.indexOf(checkedOptionId) >= 0) {
      if (verifiedAnswer === false) {
        dispatch(setQuizScore());
      }
      dispatch(setOptionStatus({ status: 'correct', id: checkedOptionId }));
    } else {
      dispatch(setOptionStatus({ status: 'incorrect', id: checkedOptionId }));
    }
    dispatch(toggleSubmit(!submitDisabled));
  }
  return (
    <div>
      {currentIndex < questionsLength ? (
        <div className="quiz-container">
          <div className="question-container">
            <p className="question-index">
              Question
              {currentIndex < questionsLength
                ? currentIndex + 1
                : questionsLength}
              /
              {questionsLength}
            </p>
            <p className="question-title">{currentQuestion.title}</p>
            <div className="options-container"><OptionsComponent question={currentQuestion} checkedOptionId={checkedOptionId} /></div>
          </div>
          <div className="buttons-container">
            {checkedOptionId !== 0
            && submitDisabled
            && questionStatus !== 'disable' ? (
              <p>
                Select another option to try again or move to next question.
              </p>
              ) : (
                ''
              )}
            {checkedOptionId !== 0 && submitDisabled ? (
              <button
                type="button"
                className="quiz-button"
                onClick={nextQuestion}
              >
                {currentIndex >= questionsLength - 1 ? 'Done' : 'Next Question'}
              </button>
            ) : (
              ''
            )}
            {!submitDisabled ? (
              <button
                type="submit"
                className="quiz-button"
                onClick={checkAnswer}
              >
                Submit
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="score">
            Score:
            {' '}
            {quizScore}
            /
            {questionsLength}
          </p>
          {
            (quizData && quizData.questions) ? quizData.questions.map((questionItem) => (
              <div key={questionItem.id} className="quiz-container">
                <div className="question-container">
                  <p className="question-title">{questionItem.title}</p>
                  <div className="options-container"><OptionsComponent question={questionItem} checkedOptionId={-1} /></div>
                </div>
              </div>
            )) : ''
          }
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
