import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import {
  setCurrentQuiz,
  setCurrentQuestionIndex,
  resetState
} from '../../redux/actions/quizActions';
import '../../css/QuestionsList.css';
import Loader from './Loader';
import QuestionsListItem from './QuestionsListItem';

function QuestionsList() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const dataFetchedRef = useRef(false);
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const numberOfQuestions = useSelector((state) => state.quiz.numberOfQuestions);
  async function fetchData(qid) {
    const response = await axios.get(`https://nisum-quizroom.herokuapp.com/api/quizzes/${qid}`);
    const quiz = response.data;
    dispatch(setCurrentQuiz(quiz));
  }
  const onChangePage = (page) => {
    dispatch(setCurrentQuestionIndex(page-1));
  };
  useEffect(() => {
    if (dataFetchedRef.current){
      return () => {
        dispatch(resetState('reset'));
      }
    };
    dataFetchedRef.current = true;
    fetchData(quizId);
  }, []);

  return (
    numberOfQuestions > 0 ? (
      <div className="questions-list">
        <p className="quiz-page-title">{currentQuiz.subtopic}</p>
        <div className="questions-pagination">
          <Pagination 
            onChange={onChangePage} 
            defaultCurrent={1} 
            defaultPageSize={1} 
            total={numberOfQuestions} />
        </div>
        <QuestionsListItem />
      </div>
    ) : (
      <div className="loading">
        <Loader />
      </div>
    )
  );
}

export default QuestionsList;
