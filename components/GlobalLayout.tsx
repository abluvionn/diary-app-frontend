import { PropsWithChildren } from 'react';
import Header from './Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8'>
      <Header/>
      {children}
    </div>
  );
};

export default Layout;
