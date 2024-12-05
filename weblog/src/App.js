import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/posts" exact render={() => <PostList posts={posts} />} />
        <Route path="/posts/:id" render={() => <PostDetail posts={posts} />} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
