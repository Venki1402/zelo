import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  return (
    <div className="flex items-end gap-2 p-4">
      <div className="flex-1 flex flex-col gap-1">
        <Label htmlFor="message" className="sr-only">
          Your message
        </Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          className="resize-none min-h-[40px] max-h-[120px] w-full"
        />
      </div>
      <Button className="h-10 px-4">Send</Button>
    </div>
  );
};

export default ChatInput;
