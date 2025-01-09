import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import './App.css';

const App = () => {
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const [loading, setLoading] = useState(true); // State to manage loading

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts'); // Replace with your backend API URL
                const data = await response.json();
                setPosts(data); // Set fetched data into state
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Stop loading when fetch is complete
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" exact element={<Home posts={posts}/>}/>
                    {/* Pass posts as props to PostList */}
                    <Route
                        path="/posts"
                        exact
                        element={loading ? <p>Loading posts...</p> : <PostList posts={posts}/>}
                    />
                    <Route path="/posts/:id" element={<PostDetail posts={posts}/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;