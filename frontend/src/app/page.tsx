'use client';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import useWebSocket from '@/lib/hooks/useWebsocket';
import { JSX, SVGProps, useEffect, useRef, useState } from 'react';
import Message from '@/components/message';

export default function Home() {
  const { messages, sendMessage } = useWebSocket('ws://chat-with-coralai.onrender.com');
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (prompt.trim() !== '') {
      sendMessage(prompt);
      setPrompt('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents newline on Enter
      handleSend();
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="font-semibold">Chat with CohereAI</div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoveHorizontalIcon className="w-5 h-5" />
        </Button>
      </header>
      <div className="flex-1 overflow-auto p-6 grid gap-2">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            isUserMessage={message.isUser}
          />
        ))}
      </div>
      <div className="bg-background border-t px-6 py-4 flex items-center gap-4">
        <Textarea
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg pr-12"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}

function MoveHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
