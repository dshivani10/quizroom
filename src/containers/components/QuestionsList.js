import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Pagination, Statistic, message, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import {
  setCurrentQuiz,
  setCurrentQuestionIndex,
  resetState
} from '../../redux/actions/quizActions';
import '../../css/QuestionsList.css';
import Loader from './Loader';
import QuestionsListItem from './QuestionsListItem';
import ScoreComponent from './ScoreComponent';

function QuestionsList() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const dataFetchedRef = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + (1000 * 21) ;
  const warnDeadline = Date.now() + (1000 * 11);
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
  const onFinish = () => {
    // setShowScore(true);
  };
  const clickSubmit = () => {
    setShowModal(true);
  }
  const submitModal = () => {
    setShowModal(false);
    setShowScore(true);
  }
  const warning = () => {
    setShowWarning(true);
    message.warning({
      content: '10 seconds left !! Test will auto submit when time is up.',
      style: {
        marginTop: '90px',
      },
    });
  };
  const countDownChange = (val) => {
    if(val < 11*1000 && !showWarning){
      warning();
    }
  }
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
      !showScore ? (
      <div className="questions-list">
        <div className="quiz-page-title">
          <p>{currentQuiz.subtopic}</p>
          { showWarning ? <Countdown valueStyle={{color: 'red'}} value={warnDeadline} onFinish={onFinish} />
          : <Countdown onChange={countDownChange} value={deadline} />
          }
        </div>
        <div className="questions-pagination">
          <Pagination 
            onChange={onChangePage} 
            defaultCurrent={1} 
            defaultPageSize={1} 
            total={numberOfQuestions} />
          <Button type="primary" size="large" onClick={clickSubmit}>Submit</Button>
          <Modal
            centered
            closable={false}
            open={showModal}
            onOk={submitModal}
            onCancel={() => setShowModal(false)}
          >
            <p>You are about to end the Quiz</p>
          </Modal>
        </div>
        <QuestionsListItem />
      </div>
    ) : <div className="questions-list">
          <div className="quiz-page-title">
            <p>{currentQuiz.subtopic}</p>
            <p>Score: 2/4</p>
          </div>
        <ScoreComponent />
        </div>) : (
        <div className="loading">
          <Loader />
        </div>
    )
  );
}

export default QuestionsList;
