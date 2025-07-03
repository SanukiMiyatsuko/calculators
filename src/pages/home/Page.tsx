import styles from "../Inter.module.css";

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.homeHead}>The Home</h1>
        <p className={styles.homeRdm}>
          自作の計算機置き場です。
        </p>
      </main>
    </>
  );
}

export default Home