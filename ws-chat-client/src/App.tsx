// import Header from "./components/layout/header.tsx";
// import Footer from "./components/layout/footer.tsx";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/pages/landing-page.tsx";
import { useState } from "react";
import RoomManagement from "./components/pages/room-management.tsx";
import ChatInterface from "./components/pages/chat-interface.tsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentName, setCurrentName] = useState<string | undefined>("Anonymous");

  const handleNavigate = (page: string, roomId?: string, name?: string) => {
    setCurrentPage(page);
    if (roomId) {
      setCurrentRoomId(roomId);
    }
    if (name) {
      setCurrentName(name);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "rooms":
        return <RoomManagement onNavigate={handleNavigate} />;
      case "chat":
        return (
          <ChatInterface
            roomId={currentRoomId}
            username={currentName}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
