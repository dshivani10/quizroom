import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './containers/views/QuizPage';
import AddQuestionPage from './containers/views/AddQuestionPage';
import Header from './containers/components/Header';
import Footer from './containers/components/Footer';
import HomePage from './containers/views/HomePage';
import LoginPage from './containers/views/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-spacing" />
        <div className="app-content">
          <Routes>
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/quiz/:quizId" exact element={<QuizPage />} />
            <Route path="/quiz/:quizId/add-question" exact element={<AddQuestionPage />} />
            <Route path="/" exact element={<HomePage />} />
            <Route>404 Not found!</Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
