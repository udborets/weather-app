import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingRing}><div></div><div></div><div></div><div></div></div>
  )
}

export default LoadingSpinner