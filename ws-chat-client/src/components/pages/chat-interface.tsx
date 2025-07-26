import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import Header from "../layout/header";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import type { Message } from "../../types";

interface ChatInterfaceProps {
  roomId: string;
  username?: string;
  onNavigate: (page: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  roomId,
  onNavigate,
  username,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setIsConnected(true);
      // Join the room
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId },
        })
      );
    };

    ws.onmessage = (e) => {
      const messageText = JSON.parse(e.data);
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.payload.message,
        timestamp: Date.now(),
        sender: messageText.payload.sender,
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;

    const payload = {
      type: "broadcast",
      payload: {
        roomId,
        username,
        message: messageInput.trim(),
      },
    };

    socket.send(JSON.stringify(payload));
    setMessageInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // name prop is available for future use (e.g., sending messages with sender info)
  // console.log('User name:', name);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Room: {roomId}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isConnected ? (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Connected
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Disconnected
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate("rooms")}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => {
                const { id, timestamp, sender, text } = message;
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {sender}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{text}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              placeholder="Type your message here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!messageInput.trim() || !isConnected}
            className="h-10 px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
