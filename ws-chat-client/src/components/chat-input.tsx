import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Textarea />
      <Button />
    </div>
  );
};

export default ChatInput;
