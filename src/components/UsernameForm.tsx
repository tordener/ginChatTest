import { useState } from "react";

interface Props {
  onSubmit: (username: string) => void;
}

export default function UsernameForm({ onSubmit }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-80 shadow-xl space-y-4">
        <h1 className="text-xl font-bold text-center">Enter Your Username</h1>
        <input
          className="w-full p-2 bg-gray-700 rounded text-white placeholder-gray-400"
          placeholder="e.g. Alice"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
}
