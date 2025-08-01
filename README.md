# Zelo

A simple real-time chat application with room-based conversations, built using React, TypeScript, Vite, and WebSockets.

## Demo

https://github.com/user-attachments/assets/f59c0406-bc0c-4ec0-b9fa-32b278f4e191

## Features

- Create or join chat rooms instantly
- Real-time messaging with WebSockets
- Anonymous or named participation
- Minimal, modern UI

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** Node.js, ws (WebSocket)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)

### 1. Clone the repository

```bash
git clone git@github.com:Venki1402/zelo.git
cd zelo
```

### 2. Install dependencies

#### Server

```bash
cd ws-chat-server
pnpm install
```

#### Client

```bash
cd ../ws-chat-client
pnpm install
```

### 3. Run the app

#### Start the WebSocket server

```bash
cd ws-chat-server
pnpm run dev
```

#### Start the client (in a new terminal)

```bash
cd ws-chat-client
pnpm run dev
```

The client will be available at [http://localhost:5173](http://localhost:5173) and will connect to the WebSocket server at `ws://localhost:8080` by default.

## Usage

- **Create Room:** Enter your name (or stay anonymous) and click "Create Room". Share the room ID with others.
- **Join Room:** Enter your name (or stay anonymous) and a room ID to join an existing room.
- **Chat:** Send messages in real time to everyone in the room.

## WebSocket Message Structure

### Join a Room

```json
{
  "type": "join",
  "payload": {
    "roomId": "123"
  }
}
```

### Send a Message

```json
{
  "type": "broadcast",
  "payload": {
    "roomId": "123",
    "username": "Alice",
    "message": "hey guys, wassup?"
  }
}
```

### Server Broadcasts to Room

```json
{
  "type": "incoming",
  "payload": {
    "sender": "Alice",
    "message": "hey guys, wassup?"
  }
}
```
