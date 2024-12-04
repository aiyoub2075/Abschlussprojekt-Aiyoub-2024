import React from 'react';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <CommentList comments={post.comments} />
  </div>
);

export default Post;
