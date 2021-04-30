import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogContext = React.createContext({
  posts: [],
  comments: [],
  createComment: (email, name, body, postId) => { },
  newComment: {
    isLoading: false,
    postId: null
  }
});



export const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    isLoading: false,
    postId: null
  });

  const fetchPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (res.data) {
          setPosts(res.data);
          return res.data;
        }
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  };

  const fetchComments = () => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(res => {
        if (res.data) {
          setComments(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCreateComment = (email, name, body, postId) => {
    setNewComment({ isLoading: true, postId: postId });
    const newComment = {
      email,
      name,
      body,
      postId
    };
    setTimeout(() => {
      setComments(prevState => [...prevState, newComment]);
      setNewComment(prevState => ({ ...prevState, isLoading: false }));
    }, 1000);
}

useEffect(() => {
  fetchPosts();
  fetchComments();
}, []);

return (
  <BlogContext.Provider
    value={{
      posts,
      comments,
      createComment: handleCreateComment,
      newComment,
    }}>
    {children}
  </BlogContext.Provider>
)
}

export default BlogContext;