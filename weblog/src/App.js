import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import { posts } from './data/dummyData';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <PostList posts={posts} />
    <Footer />
  </div>
);

export default App;
