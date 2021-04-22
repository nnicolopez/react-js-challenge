import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import Loading from '../loading';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Comment from '../comment';
import CommentForm from '../commentForm';

const Post = ({ title, body, id, comments, isLoading, createCommentSuccess }) => {
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (createCommentSuccess) {
      setShowComments(true);
    }
  }, [createCommentSuccess]);

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

      {isLoading && <Loading />}
      
      <CommentForm postId={id} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    isLoading: state.comments.loading,
    createCommentSuccess: state.comments.createCommentSuccess
  }
}

export default connect(mapStateToProps)(Post);

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  body: PropTypes.string,
  title: PropTypes.string,
};
