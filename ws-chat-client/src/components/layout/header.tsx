import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-black dark:text-white" />
            <span className="text-xl font-semibold text-black dark:text-white">
              Chat
            </span>
          </div>
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
