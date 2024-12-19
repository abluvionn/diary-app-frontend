import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8'>
      <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>{children}</header>
    </div>
  );
};

export default Layout;
