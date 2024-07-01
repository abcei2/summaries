const MainContainer = ({ children, className }: { children: any, className?: string }) => {
  return <div className={`pt-10 px-8 ${className}`}>{children}</div>;
};

export default MainContainer;
