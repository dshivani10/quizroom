import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  addAllQuizzes,
} from '../../redux/actions/quizActions';
import '../../css/Home.css';
import Loader from '../components/Loader';

function HomePage() {
  const allQuizzesData = useSelector((state) => state.quiz.allQuizzesData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchData() {
    const response = await axios.get('https://nisum-quizroom.herokuapp.com/api/all-quizzes');
    const quiz = response.data;
    dispatch(addAllQuizzes(quiz));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {allQuizzesData.length > 0 ? allQuizzesData.map((quizItem) => (
        <div className="quiz-container" role="button" tabIndex="0" onClick={() => navigate(`/quiz/${quizItem._id}`)} onKeyDown={() => navigate(`/quiz/${quizItem._id}`)} key={quizItem.name}>
          <div className="quiz-box" />
          <p className="quiz-title">{quizItem.name}</p>
        </div>
      )) : (
      <div className="loading">
        <Loader />
      </div>
    )}
    </div>
  );
}

export default HomePage;
