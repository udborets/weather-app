import styles from "./PageLayout.module.scss";

interface IPageLayout {
  children: JSX.Element[] | JSX.Element;
}

const PageLayout = ({ children }: IPageLayout) => {
  return (
    <main className={`${styles.page} flex justify-center items-center flex-grow w-full h-full`}>
      <div className="page__container h-full w-full flex flex-grow">
        {children}
      </div>
    </main>
  )
}

export default PageLayout