import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import { posts } from './data/dummyData';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/posts" exact element={<PostList posts={posts} />} />
        <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
