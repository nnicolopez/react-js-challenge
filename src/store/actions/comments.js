import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchCommentsSuccess = (comments) => {
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments
  }
};

export const fetchCommentsFailed = (error) => {
  return {
    type: actionTypes.FETCH_COMMENTS_FAILED,
    error: error
  }
};

export const fetchCommentsStart = () => {
  return {
    type: actionTypes.FETCH_COMMENTS_START
  }
};

export const fetchComments = () => {
  return dispatch => {
    dispatch(fetchCommentsStart());
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(res => {
        if (res.data) {
          dispatch(fetchCommentsSuccess(res.data));
        }
      })
      .catch(error => {
        dispatch(fetchCommentsFailed(error));
      });
  }
}

export const createCommentSuccess = (comment) => {
  return {
    type: actionTypes.CREATE_COMMENT_SUCCESS,
    comment
  }
};

export const createCommentFailed = (error) => {
  return {
    type: actionTypes.CREATE_COMMENT_FAILED,
    error: error
  }
};

export const createCommentStart = () => {
  return {
    type: actionTypes.CREATE_COMMENT_START
  }
};

export const createComment = (email, name, body, postId) => {
  return dispatch => {
    dispatch(createCommentStart());
    setTimeout(() => dispatch(createCommentSuccess({name, email, body, postId, id: Math.random()})), 1000);
  }
}
