import { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from './components/post';
import Loading from './components/loading';
import * as actions from './store/actions';

const App = ({posts, fetchPosts, comments, fetchComments}) => {
  useEffect(() => {
   fetchPosts();
   fetchComments();
  }, [fetchPosts, fetchComments]);

  return (
    <div>
      {posts.loading ? <Loading /> : (
        <ul>
          {posts?.postsList?.map(post => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      )}
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
