import { useEffect, useState } from 'react';
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
  const [ selectedTopic,  setSelectedTopic] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchData() {
    const response = await axios.get('http://localhost:5000/api/all-quizzes');
    const quiz = response.data;
    dispatch(addAllQuizzes(quiz));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {allQuizzesData.length > 0 ? allQuizzesData.map((quizItem) => (
        <div 
          className="quiz-container" 
          role="button" tabIndex="0" 
          onMouseEnter={() => setSelectedTopic(quizItem.subtopic)} 
          onMouseLeave={() => setSelectedTopic('')} 
          onClick={() => navigate(`/quiz/${quizItem._id}`)} 
          onKeyDown={() => navigate(`/quiz/${quizItem._id}`)} 
          key={quizItem._id}
        >
          {
            (selectedTopic === quizItem.subtopic) ? <img className="subtopic-image" src={quizItem.hoverimageurl} alt="subtopic" /> : <img className="subtopic-image" src={quizItem.imageurl} alt="subtopic" />
          }
          <p className="quiz-title">{quizItem.subtopic}</p>
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
