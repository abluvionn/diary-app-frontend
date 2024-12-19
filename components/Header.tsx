'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { selectUser } from '@/lib/features/users/usersSlice';
import { logout } from '@/lib/features/users/usersThunks';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Ensures the component waits for hydration
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  if (!isHydrated) {
    // Prevent rendering until hydration is complete
    return (
      <div className='flex w-full shrink-0 flex-col sm:flex-row items-start pt-5 md:px-6'>
        <Skeleton className='w-[50px] h-[30px]'/>
        <div className='sm:ml-auto flex items-center gap-3'>
          <Skeleton className='w-[50px] h-[30px]'/>
        </div>
      </div>
    );
  }
  return (
    <header className='flex w-full shrink-0 flex-col sm:flex-row items-start pt-5 md:px-6'>
      <Link href='/' className='text-lg'>
        Home
      </Link>
      <div className='sm:ml-auto flex items-center gap-3'>
        {user?.email ? (
          <>
            <h2 className='text-lg font-bold'>{user?.email}</h2>
            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <Button asChild>
            <Link href='/login'>Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
