import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  addAllQuizzes,
} from '../../redux/actions/quizActions';
import '../../css/Home.css';
import Loader from '../components/Loader';
import AppConstants from '../../configs/constants';

function HomePage() {
  const allQuizzesData = useSelector((state) => state.quiz.allQuizzesData);
  const user_role = useSelector((state) => state.user.role);
  const [ selectedTopic,  setSelectedTopic] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);
  async function fetchData() {
    const response = await axios.get(`${AppConstants.API_ENDPOINT}/api/all-quizzes`);
    const quiz = response.data;
    dispatch(addAllQuizzes(quiz));
  }
  function navigateByRole(id){
    if(user_role === 'reviewer'){
      navigate(`/quiz/${id}/add-question`)
    }else{
      navigate(`/quiz/${id}`)
    }
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
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
          onClick={() => navigateByRole(quizItem._id)} 
          onKeyDown={() => navigateByRole(quizItem._id)} 
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
