'use client';

import Layout from '@/components/GlobalLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import axiosApi from '@/lib/axiosApi';
import { API_URL } from '@/lib/constants';
import { selectUser } from '@/lib/features/users/usersSlice';
import { useAppSelector } from '@/lib/hooks';
import { Entry } from '@/types/entry';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  text: z.string().min(1, { message: 'Text is required.' }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 2000000, {
      message: 'Your image must be less than 2MB.'
    })
    .optional()
});

export default function Home() {
  const user = useAppSelector(selectUser);
  const [isHydrated, setIsHydrated] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      text: '',
      image: undefined
    }
  });

  useEffect(() => {
    setIsHydrated(true); // Ensures the component waits for hydration
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axiosApi.get<Entry[]>('/entries');
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, text, image } = values;
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);

      if (image) {
        formData.append('image', image);
      }

      const response = await axiosApi.post<Entry>('/entries', formData);

      if (!response.data) {
        return
      }

      setIsOpen(false);
      setEntries(prevEntries => [...prevEntries, response.data])
    } catch (error) {
      console.log(error);
    }
  };

  if (!isHydrated) {
    // Prevent rendering until hydration is complete
    return (
      <div className='flex items-center justify-end'>
        <Skeleton className='h-[35px] w-[95px]' />
      </div>
    );
  }

  return (
    <Layout>
      <div className='flex items-center justify-between pt-10'>
        <h1 className='text-3xl'>Entries</h1>
        {user && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)}>Add Entry</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add Entry</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id='entry-form'>
                  <div className='grid gap-4 py-4'>
                    <div className='grid gap-4'>
                      <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <FormControl>
                              <Input id='title' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid gap-4'>
                      <FormField
                        control={form.control}
                        name='text'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor='text'>Text</FormLabel>
                            <FormControl>
                              <Input id='text' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid gap-4'>
                      <FormField
                        control={form.control}
                        name='image'
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                          <FormItem>
                            <FormLabel htmlFor='image'>Image</FormLabel>
                            <FormControl>
                              <Input
                                {...fieldProps}
                                id='image'
                                type='file'
                                accept='image/png, image/jpeg, image/jpg, image/webp, image/gif'
                                onChange={(e) => onChange(e.target.files && e.target.files[0])}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <DialogFooter>
                <Button type='submit' form='entry-form'>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry._id} className='my-5 p-4 rounded-lg shadow-md bg-white'>
              <h2 className='font-bold text-2xl'>{entry.title}</h2>
              <div className='my-4'>
                {entry.image && (
                  <Image
                    src={API_URL + '/' + entry.image}
                    width={200}
                    height={100}
                    alt={entry.title}
                    style={{ maxWidth: '200px', marginBottom: '0.5rem' }}
                  />
                )}
                <p className='text-base'>{entry.text}</p>
              </div>
              <small className='text-gray-500'>Author: {entry.author.email}</small>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className='text-center mt-10 text-2xl'>No entries yet.</h1>
      )}
    </Layout>
  );
}
