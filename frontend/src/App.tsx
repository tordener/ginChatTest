import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import UsernameForm from "./components/UsernameForm";

export default function App() {
  const [username, setUsername] = useState<string | null>(null);

  return username ? (
    <div className="w-screen">
      <ChatRoom username={username} />
    </div>
  ) : (
    <UsernameForm onSubmit={setUsername} />
  );
}