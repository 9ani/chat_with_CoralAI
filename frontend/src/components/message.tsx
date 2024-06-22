import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type MessageProps = {
  text: string;
  isUserMessage: boolean;
};

const Message: React.FC<MessageProps> = ({ text, isUserMessage }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isUserMessage) {
      // Simulate typing effect for AI's messages
      const timer = setTimeout(() => {
        setDisplayedText(text);
      }, Math.floor(Math.random() * 50) + 50); // Random delay between 50ms to 100ms for typing effect

      return () => clearTimeout(timer);
    } else {
      // For user's messages, show immediately
      setDisplayedText(text);
    }
  }, [text, isUserMessage]);

  return (
    <div className={`flex items-start gap-2 ${isUserMessage ? 'justify-end' : ''}`}>
      {!isUserMessage && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      )}
      <div className={`rounded-lg p-3 max-w-[75%] ${isUserMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        <p className="mb-1">{displayedText}</p>
      </div>
      {isUserMessage && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Message;
