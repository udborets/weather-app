interface IPageLayout {
  children: JSX.Element[] | JSX.Element;
}

const PageLayout = ({ children }: IPageLayout) => {
  return (
    <main className="page flex justify-center align-center w-full h-full flex-grow p-8 ">
      <div className="page__container h-full w-full">
        {children}
      </div>
    </main>
  )
}

export default PageLayout