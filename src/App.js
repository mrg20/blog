import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router basename="/blog">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:profile/:slug" element={<PostDetail />} />
          <Route path="/profile/:name" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
