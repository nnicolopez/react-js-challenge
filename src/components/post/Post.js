import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import Loading from '../loading';
import classnames from 'classnames';
import Comment from '../comment';
import CommentForm from '../commentForm';
import BlogContext from '../../context/blogContext';

const Post = ({ title, body, id }) => {
  const [showComments, setShowComments] = useState(false);
  const {comments, newComment} = useContext(BlogContext);

  useEffect(() => {
    if (newComment.postId === id && !newComment.isLoading) {
      setShowComments(true);
    }
  }, [newComment.postId, newComment.isLoading, id]);

  return (
    <div className={styles.post} data-testid='post'>
      <div className={styles['post-body']} onClick={() => setShowComments(prevState => !prevState)}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>

      <span className={classnames(styles['comments-label'], showComments ? styles['arrow-up'] : styles['arrow-down'])}
        onClick={() => setShowComments(prevState => !prevState)}>
        Comments
      </span>

      <div className={styles['post-comments']}>
        {showComments && (
          <ul>
            {comments
              .filter(comment => comment.postId === id)
              .map(({ email, name, body, id }) => (
                <li key={id}>
                  <Comment email={email} name={name} body={body} />
                </li>
              ))}
          </ul>
        )}
      </div>

      {(newComment.isLoading && newComment.postId === id) && <Loading />}
      
      <CommentForm postId={id} />
    </div>
  );
};

export default Post;

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  body: PropTypes.string,
  title: PropTypes.string,
};
