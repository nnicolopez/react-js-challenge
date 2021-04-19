import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts
  }
};

export const fetchPostsFailed = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAILED,
    error: error
  }
};

export const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  }
};

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart());
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (res.data) {
          dispatch(fetchPostsSuccess(res.data));
        }
      })
      .catch(error => {
        dispatch(fetchPostsFailed(error));
      });
  };
};
