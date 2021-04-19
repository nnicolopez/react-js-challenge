import { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Post from './components/post';
import * as actions from './store/actions';

const App = ({posts, fetchPosts, comments, fetchComments}) => {
  useEffect(() => {
   fetchPosts();
   fetchComments();
  }, []);
  console.log(posts, comments);
  return (
    <div className="App">
      <Post />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(actions.fetchPosts()),
    fetchComments: () => dispatch(actions.fetchComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
