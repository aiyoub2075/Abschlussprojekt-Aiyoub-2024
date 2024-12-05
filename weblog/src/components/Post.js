import React from 'react';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div>
    <h2>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </h2>
    <p>{post.content}</p>
    <CommentList comments={post.comments} />
  </div>
);

export default Post;
