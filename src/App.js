import './App.css';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './containers/views/QuizPage';
import AddQuestionPage from './containers/views/AddQuestionPage';
import Header from './containers/components/Header';
import Footer from './containers/components/Footer';
import HomePage from './containers/views/HomePage';
import LoginPage from './containers/views/LoginPage';
import RegistrationPage from './containers/views/RegistrationPage';
import ProfilePage from './containers/views/ProfilePage';
import PrivateRoute from './PrivateRoute';
import {
  setUser,
} from './redux/actions/quizActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    const token = localStorage.getItem('user');
    if(token){
      dispatch(setUser(JSON.parse(token)));
    }
  },[])
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-spacing" />
        <div className="app-content">
          <Fragment>
            <Routes>
              <Route path="/app/login" exact element={<LoginPage />} />
              <Route path="/app/registration" exact element={<RegistrationPage />} />
              <Route path="/app/profile" exact element={<ProfilePage />} />
              <Route exact path='/quiz/:quizId' element={<PrivateRoute auth={user.logged}/>}>
                <Route exact path='/quiz/:quizId' element={<QuizPage/>}/>
              </Route>
              <Route exact path='/quiz/:quizId/add-question' element={<PrivateRoute auth={user.logged}/>}>
                <Route exact path='/quiz/:quizId/add-question' element={<AddQuestionPage/>}/>
              </Route>
              <Route path="/" exact element={<HomePage />} />
              <Route>404 Not found!</Route>
            </Routes>
          </Fragment>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
