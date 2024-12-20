'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/users/usersThunks';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'Password is required.' })
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await dispatch(login(values)).unwrap();
    router.push('/');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            type='email'
                            placeholder='m@example.com'
                            autoComplete='username'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex items-center'>
                          <FormLabel htmlFor='password'>Password</FormLabel>
                          <a
                            href='#'
                            className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            id='password'
                            type='password'
                            autoComplete='current-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </form>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a href='signup' className='underline underline-offset-4'>
                Sign up
              </a>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
