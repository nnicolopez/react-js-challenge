import styles from './Loading.module.scss';

// https://loading.io/css/
const Loading = () => <><div className={styles['lds-ellipsis']}><div></div><div></div><div></div><div></div></div></>;

export default Loading;
