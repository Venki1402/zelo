import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

const ChatInput = () => {
  const inputRef = useRef(null);
  const [socket, setSocket] = useState<WebSocket | undefined>();

  const sendMessage = () => {
    if (!socket) {
      return;
    }

    // @ts-expect-error ...
    const message = inputRef.current.value;

    // @ts-expect-error ...
    inputRef.current.value = "";

    socket.send(message);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

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
          ref={inputRef}
        />
      </div>
      <Button className="h-10 px-4" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
