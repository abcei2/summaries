const MainContainer = ({ children, className }: { children: any, className?: string }) => {
  return <div className={`pt-5 px-8 ${className} pb-6`}>{children}</div>
};

export default MainContainer;
