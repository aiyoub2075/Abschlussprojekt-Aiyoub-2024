import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <h2>Post nicht gefunden</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h3>Kommentare</h3>
      {post.comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p><strong>- {comment.author}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
