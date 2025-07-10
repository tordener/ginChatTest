import { useState } from "react";

interface Message {
  from: string;
  text: string;
  to?: string | null;
}

interface Props {
  username: string;
}

export default function ChatRoom({ username }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "admin", text: "Welcome to the chat!" }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: Message = { from: username, text: message };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Online Users</h2>
        <ul className="space-y-1 text-green-400">
          <li>Alice</li>
          <li>Bob</li>
          <li>You ({username})</li>
        </ul>
      </aside>

      {/* Chat area */}
      <main className="flex flex-col flex-grow">
        {/* Message history */}
        <section className="flex-grow overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-800 p-2 rounded">
              <span className="font-bold"><a href="#">{msg.from}</a>: </span> {msg.text}
            </div>
          ))}
        </section>

        {/* Input area */}
        <footer className="p-4 bg-gray-800 flex">
          <input
            className="flex-grow p-2 bg-gray-700 rounded-l text-white placeholder-gray-400"
            placeholder="Type a message..."
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
        </footer>
      </main>
    </div>
  );
}
