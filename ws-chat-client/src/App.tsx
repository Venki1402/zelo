import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

const App = () => {
  const inputRef = useRef(null);
  const [roomId, setRoomId] = useState<string>("123");
  const [socket, setSocket] = useState<WebSocket | undefined>();

  const sendMessage = () => {
    if (!socket) {
      return;
    }

    const payload = {
      type: "broadcast",
      payload: {
        roomId: roomId,
        // @ts-expect-error ...
        message: inputRef.current.value,
      },
    };

    // @ts-expect-error ...
    inputRef.current.value = "";

    socket.send(JSON.stringify(payload));
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* display all message. also make sure its scrollable. and if the entire space is filled a nd we get a new messge scroll should stick to  bottom i.e.. latest messages*/}
      </div>
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
    </div>
  );
};

export default App;
