import Link from 'next/link';
import React from 'react';
import { Github } from 'lucide-react';

const FooterLanding = () => {
  return (
    <footer className="bg-secondary flex text-muted-foreground mx-4 p-4 items-center text-sm">
      <p className='flex'>
        Product by{' '}
        <Link href="https://github.com/ayush0402/" passHref className='flex items-center mx-2'>
          
            Ayush Kumar <Github className='ml-1 h-4 w-4' />
          
        </Link>{' '}
        &{' '}
        <Link href="https://github.com/astrra/" passHref className='flex items-center mx-2'>
          
            Akshay Bhatnagar <Github className='ml-1 h-4 w-4' />
          
        </Link>
      </p>
    </footer>
  );
};

export default FooterLanding;
