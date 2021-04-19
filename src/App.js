import { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Post from './components/post';
import * as actions from './store/actions';

const App = ({posts, fetchPosts}) => {
  useEffect(() => {
   fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="App">
      <Post />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(actions.fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
