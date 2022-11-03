import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Pagination, Button, Modal, Result } from 'antd';
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
  const [showScore, setShowScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const currentQuiz = useSelector((state) => state.quiz.currentQuiz);
  const numberOfQuestions = useSelector((state) => state.quiz.numberOfQuestions);
  const currentQuizQuestions = useSelector((state) => state.quiz.currentQuizQuestions);
  async function fetchData(qid) {
    const response = await axios.get(`https://nisum-quizroom.herokuapp.com/api/quizzes/${qid}`);
    const quiz = response.data;
    dispatch(setCurrentQuiz(quiz));
  }
  const onChangePage = (page) => {
    dispatch(setCurrentQuestionIndex(page-1));
  };
  const clickSubmit = () => {
    setShowModal(true);
  }
  const submitModal = () => {
    setShowModal(false);
    let sum = 0;
    currentQuizQuestions.forEach(element => {
      if((element.type === 'radio' || element.type === 'bool') && element.checkedOptionId === element.correctOptionId){
        sum=sum+1;
      }else if(element.type === 'blank' && element.correctAnswer === element.typedAnswer){
        sum=sum+1;
      }else if(element.type === 'check' && JSON.stringify(element.checkedOptionIds.sort()) === JSON.stringify(element.correctOptionIds.sort())){
        sum=sum+1;
      }
    });
    setScore(sum);
    setShowResult(true);
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
      !showResult ? (
        <div className="questions-list">
          <div className="quiz-page-title">
            <p>{currentQuiz.subtopic}</p>
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
      ) : (
        (showResult && !showScore) ? 
        <div>
          <Result
            status="success"
            title="Completed the Quiz !"
            subTitle={`You have successfully completed the ${currentQuiz.subtopic} quiz. You have scored ${score}/${numberOfQuestions}`}
            extra={[
              <Button onClick={() => setShowScore(true)} type="primary" key="console">
                Review Answers
              </Button>,
              <Button key="home">Go to Home</Button>,
            ]}
          />
        </div> :
        <div className="questions-list">
          <div className="quiz-page-title">
            <p>{currentQuiz.subtopic}</p>
            <p>Score: {score}/{numberOfQuestions}</p>
          </div>
          <ScoreComponent />
        </div>
      )) : (
      <div className="loading">
        <Loader />
      </div>
    )
  );
}

export default QuestionsList;
