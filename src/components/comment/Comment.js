import PropTypes from 'prop-types';
import styles from './Comment.module.scss';

const Comment = ({name, body, email}) => {

  return (
    <div className={styles.comment}>
      <div className={styles['comment-body']}>
        <p className={styles['comment-name']}>{name}</p>
        <p className={styles['comment-text']}>{body}</p>
      </div>
      <p className={styles['comment-email']}>{email}</p>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  name: '',
  body: '',
  email: '',
};