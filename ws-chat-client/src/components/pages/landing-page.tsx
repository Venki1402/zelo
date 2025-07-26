import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageSquare } from "lucide-react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { Button } from "../ui/button";
import { NavigationProps } from "../../types";

const LandingPage: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-bold tracking-tight">
                Connect.
                <br />
                <span className="text-gray-500">Chat. Collaborate.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real-time messaging made simple. Create or join rooms instantly
                and start conversations that matter.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
              <Button
                onClick={() => onNavigate("rooms")}
                className="flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={() => onNavigate("rooms")}>
                Join Room
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-24"
            >
              <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl">
                <Users className="h-12 w-12 mb-4 text-black dark:text-white" />
                <h3 className="text-2xl font-semibold mb-2">Create Rooms</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up dedicated spaces for your team, friends, or community
                  discussions.
                </p>
              </div>
              <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl">
                <MessageSquare className="h-12 w-12 mb-4 text-black dark:text-white" />
                <h3 className="text-2xl font-semibold mb-2">Real-time Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Experience instant messaging with seamless real-time
                  communication.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
