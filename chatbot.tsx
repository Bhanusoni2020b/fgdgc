import { MessageSquare } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          <h1 className="text-xl font-bold">AI Chatbot</h1>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
          <span className="text-sm font-medium">Online</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;

import { cn } from "@/lib/utils";

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message = ({ text, isUser }: MessageProps) => {
  return (
    <div className={cn(
      "max-w-[80%] rounded-2xl px-4 py-3 break-words",
      isUser 
        ? "bg-blue-600 text-white ml-auto rounded-br-none" 
        : "bg-white shadow-sm mr-auto rounded-bl-none"
    )}>
      <p>{text}</p>
    </div>
  );
};

export default Message;

import { useState, FormEvent, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const MessageInput = ({ onSendMessage, isTyping }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <textarea
          className="flex-1 resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <Button 
          type="submit" 
          disabled={!message.trim() || isTyping}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      {isTyping && (
        <p className="text-xs text-gray-500 mt-1 text-center">AI is typing...</p>
      )}
    </div>
  );
};

export default MessageInput;

import { RefObject } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: Array<{ text: string; isUser: boolean }>;
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, isTyping, messagesEndRef }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

const TypingIndicator = () => {
    return (
      <div className="max-w-[80%] bg-white shadow-sm rounded-2xl px-5 py-3 mr-auto rounded-bl-none inline-block">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
        </div>
      </div>
    );
  };
  
  export default TypingIndicator;

// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>

        import { useState, useRef, useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm an AI assistant. How can I help you today?", isUser: false },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;
    
    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true }]);
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Generate AI response after a delay
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Simple response logic
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello there! How can I assist you today?";
    } else if (lowerCaseMessage.includes("how are you")) {
      return "I'm just a program, but I'm running well! How are you doing?";
    } else if (lowerCaseMessage.includes("your name")) {
      return "I'm an AI assistant created with HTML, CSS, and JavaScript!";
    } else if (lowerCaseMessage.includes("weather")) {
      return "I don't have access to real-time weather data, but I hope it's nice where you are!";
    } else if (lowerCaseMessage.includes("time")) {
      return `I don't have access to your local time, but I can tell you that the current UTC time is ${new Date().toUTCString()}.`;
    } else if (lowerCaseMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("goodbye")) {
      return "Goodbye! Feel free to return if you have more questions.";
    } else {
      return "That's an interesting topic. While I'm a simple demo AI, I'd love to learn more about your question. Could you provide more details?";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
        <MessageInput onSendMessage={handleSendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Index;        