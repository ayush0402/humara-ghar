"use client"
import { FC } from 'react';
import { notFound } from 'next/navigation';
import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import ChatHeader from '@/components/custom/chat-header';

interface PageProps {
  params: {
    chatId: string;
  };
}

const Page: FC<PageProps> = ({ params }: PageProps) => {
  const { chatId } = params;
  const [userId1, userId2] = chatId.split('--');
  return (
    <div className='ml-[10px]'>
      <ChatHeader/>
    </div>
  )
};

export default Page;
