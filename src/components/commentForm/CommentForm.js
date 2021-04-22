import { useState } from 'react';
import { connect } from 'react-redux';
import styles from './CommentForm.module.scss';
import * as actions from '../../store/actions';

const CommentForm = ({ createComment, postId }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(email, name, comment, postId);
    setEmail('');
    setName('');
    setComment('');
  }

  const isFormValid = email !== '' && comment !== '';

  return (
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
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (email, name, body, postId) => dispatch(actions.createComment(email, name, body, postId))
  }
}

export default connect(null, mapDispatchToProps)(CommentForm);
