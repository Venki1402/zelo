import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { NavigationProps } from "../../types";

const RoomManagement: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    onNavigate("chat", newRoomId);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      const userName = anonymous || !name.trim() ? "Anonymous" : name.trim();
      onNavigate("chat", roomId.trim(), userName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">Join the conversation</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create a new room or join an existing one
            </p>
          </div>

          <div>
            <Input
              placeholder="Enter your name"
              value={anonymous ? "Anonymous" : name}
              onChange={(e) => setName(e.target.value)}
              disabled={anonymous}
              className="mb-2"
            />
            <div className="flex items-center mb-2">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="mr-2 accent-primary"
              />
              <label
                htmlFor="anonymous"
                className="text-sm text-gray-600 dark:text-gray-400 select-none cursor-pointer"
              >
                Stay Anonymous
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4"
            >
              <h3 className="text-xl font-semibold">Create New Room</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Start a new conversation space
              </p>

              <Button onClick={handleCreateRoom} className="w-full">
                Create Room
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-black text-gray-500">
                  or
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4"
            >
              <h3 className="text-xl font-semibold">Join Existing Room</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enter a room ID to join the conversation
              </p>
              <Input
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
              />
              <Button
                onClick={handleJoinRoom}
                className="w-full"
                disabled={!roomId.trim()}
              >
                Join Room
              </Button>
            </motion.div>

            <div className="text-center">
              <button
                onClick={() => onNavigate("landing")}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomManagement;
