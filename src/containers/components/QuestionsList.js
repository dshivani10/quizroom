import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import {
  setCurrentQuiz
} from '../../redux/actions/quizActions';
import '../../css/QuestionsList.css';
import Loader from './Loader';

function QuestionsList() {
  const { quizId } = useParams();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const dispatch = useDispatch();
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const currentQuizQuestions = useSelector((state) => state.quiz.currentQuizQuestions);
  const numberOfQuestions = useSelector((state) => state.quiz.numberOfQuestions);

  async function fetchData(qid) {
    const response = await axios.get(`https://nisum-quizroom.herokuapp.com/api/quizzes/${qid}`);
    const quiz = response.data;
    dispatch(setCurrentQuiz(quiz));
  }
  const onChangePage = (page) => {
    setCurrentQuestionIndex(page-1);
  };
  useEffect(() => {
    fetchData(quizId);
  }, []);

  return (
    numberOfQuestions > 0 ? (
      <div className="questions-list">
        <p>{currentQuiz.name}</p>
        <Pagination onChange={onChangePage} defaultCurrent={1} defaultPageSize={1} total={numberOfQuestions} />
        <p>{currentQuizQuestions[currentQuestionIndex].title}</p>
      </div>
    ) : (
      <div className="loading">
        <Loader />
      </div>
    )
  );
}

export default QuestionsList;
