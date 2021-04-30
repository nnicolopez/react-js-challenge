import { useContext } from 'react';
import Post from './components/post';
import BlogContext from './context/blogContext';

const App = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div>
      {posts && (
        <ul>
          {posts?.map(post => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
