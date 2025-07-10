import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "admin", text: "Welcome to the chat!" }
  ]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (registered) {
      ws.current = new WebSocket("ws://localhost:8080/ws");

      ws.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setMessages((msgs) => [...msgs, msg]);
      };

      ws.current.onclose = () => {
        console.log("WebSocket closed");
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [registered]);

  const handleRegister = () => {
    if (username.trim()) {
      setRegistered(true);
    }
  };

  const handleSend = () => {
    if (!message.trim() || !ws.current) return;

    const newMsg = { from: username, text: message };
    ws.current.send(JSON.stringify(newMsg));
    setMessage("");
  };

  if (!registered) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-black p-6 rounded-lg w-80 shadow-xl space-y-4">
          <h1 className="text-xl font-semibold text-center text-yellow-400">Enter Username</h1>
          <input
            className="w-full p-2 bg-black rounded text-white placeholder-gray-400"
            placeholder="e.g. Alice"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 pr-4">
        <h2 className="text-lg font-bold mb-2">Users</h2>
        <ul className="space-y-1">
          <li className="text-green-400">Alice</li>
          <li className="text-green-400">Bob</li>
          <li className="text-green-400">You ({username})</li>
        </ul>
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-grow">
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-800 p-2 rounded">
              <span className="font-bold">{msg.from}:</span> {msg.text}
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-800 flex">
          <input
            className="flex-grow p-2 bg-gray-700 rounded-l text-white placeholder-gray-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
