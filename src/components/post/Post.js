import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import Loading from '../loading';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as actions from '../../store/actions';
import Comment from '../comment';

const Post = ({ title, body, id, comments, isLoading, createComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(email, name, comment, id);
    setEmail('');
    setName('');
    setComment('');
  }

  const isFormValid = email !== '' && comment !== '';

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

      <form onSubmit={handleSubmit} className={styles['comment-form']}>
        <label className={styles['email-label']}>
          Email*:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className={styles['name-label']}>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label className={styles['comment-label']}>
          Comment*:
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        </label>
        <button type="submit" disabled={!isFormValid}>Comment</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    isLoading: state.comments.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (email, name, body, postId) => dispatch(actions.createComment(email, name, body, postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  body: PropTypes.string,
  title: PropTypes.string,
};
