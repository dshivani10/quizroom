import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizComponent from './containers/QuizComponent';
import AddQuestion from './containers/AddQuestion';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Home from './containers/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="app-spacing" />
        <div className="app-content">
          <Routes>
            <Route path="/quiz/:quizId" exact element={<QuizComponent />} />
            <Route path="/quiz/:quizId/add-question" exact element={<AddQuestion />} />
            <Route path="/" exact element={<Home />} />
            <Route>404 Not found!</Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
