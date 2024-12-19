'use client';

import Layout from '@/components/GlobalLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { selectUser } from '@/lib/features/users/usersSlice';
import { useAppSelector } from '@/lib/hooks';
import { useState, useEffect } from 'react';

export default function Home() {
  const user = useAppSelector(selectUser);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Ensures the component waits for hydration
  }, []);

  if (!isHydrated) {
    // Prevent rendering until hydration is complete
    return (
      <div className='flex items-center justify-end'>
        <Skeleton className='h-[35px] w-[95px]'/>
      </div>
    );
  }

  return (
    <Layout>
      <div className='flex items-center justify-between pt-10'>
        <h1 className='text-3xl'>Entries</h1>
        {user && <Button>Add Entry</Button>}
      </div>
    </Layout>
  );
}
