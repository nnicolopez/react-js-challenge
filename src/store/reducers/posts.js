import * as actionTypes from '../actions/actionTypes';
import {postsMock} from './mokcs';

const initialState = {
    postsList: [],
    loading: false,
    error: false
}

const fetchPostsStart = (state, action) => {
    return {
      ...state,
      loading: true 
    };
};
const fetchPostsSuccess = (state, action) => {
    return {
      ...state, 
      postsList: action.posts, 
      loading: false
    };
};
const fetchPostsFailed = (state, action) => {
    return {
      ...state,
      postsList: [...postsMock], // sometimes the request to the json server fails, in that case it will use mocked data
      loading: false,
      error: action.error
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAILED: return fetchPostsFailed(state, action);
        default: return state;
    }
}

export default reducer;