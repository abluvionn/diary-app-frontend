'use client';

import { Button } from '@/components/ui/button';
import { selectUser } from '@/lib/features/users/usersSlice';
import { logout } from '@/lib/features/users/usersThunks';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
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
    <div>
      <h1>Home</h1>
      <h2>User: {user?.user.email}</h2>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
