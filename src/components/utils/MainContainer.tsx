const MainContainer = ({ children, className }: { children: any, className?: string }) => {
  return <div className={`pt-5 px-8 ${className} min-h-screen max-h-[1400px] pb-6 overflow-auto `}>{children}</div>;
};

export default MainContainer;
