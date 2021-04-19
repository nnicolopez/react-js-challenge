import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    loading: false,
    error: false
}

const fetchCommentsStart = (state, action) => {
    return {
      ...state,
      loading: true 
    };
};
const fetchCommentsSuccess = (state, action) => {
    return {
      ...state, 
      comments: [...action.comments], 
      loading: false
    };
};
const fetchCommentsFailed = (state, action) => {
    return {
      loading: false,
      error: action.error
    };
};

const createCommentStart = (state, action) => {
  return {
    ...state,
    loading: true 
  };
};
const createCommentSuccess = (state, action) => {
  return {
    ...state, 
    comments: [...state.comments, action.comment], 
    loading: false
  };
};
const createCommentFailed = (state, action) => {
  return {
    loading: false,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAILED: return fetchCommentsFailed(state, action);
        case actionTypes.CREATE_COMMENT_START: return createCommentStart(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS: return createCommentSuccess(state, action);
        case actionTypes.CREATE_COMMENT_FAILED: return createCommentFailed(state, action);
        default: return state;
    }
}

export default reducer;