import { SignUpForm } from "@/components/signup-form";

const Page = () => {
  return (
    <div className='flex bg-purple-950 min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <SignUpForm/>
      </div>
    </div>
  );
};

export default Page;