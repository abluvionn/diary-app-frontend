'use client';

import Layout from '@/components/GlobalLayout';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/lib/features/users/usersSlice';
import { logout } from '@/lib/features/users/usersThunks';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
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
    return null;
  }

  return (
    <Layout>
      <Link href='/' className='text-lg'>
        Home
      </Link>
      <div className='ml-auto flex items-center gap-3'>
        {user?.user.email ? (
          <>
            <h2 className='text-lg font-bold'>{user?.user.email}</h2>
            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <Button asChild>
            <Link href='/login'>Sign In</Link>
          </Button>
        )}
      </div>
    </Layout>
  );
}
