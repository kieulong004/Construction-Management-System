import React, { useState } from "react";
import axios from "axios";
import "../app.css"

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://192.168.100.72:5000/chat", { message: input });
      console.log(res.data);
      setMessages([...newMessages, { sender: "bot", text: res.data.response }]);
    } catch {
      setMessages([...newMessages, { sender: "bot", text: "Lỗi kết nối API!" }]);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="h-80 overflow-y-auto bg-gray-700 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto w-fit" : "bg-gray-500 text-white"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded bg-gray-900 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập tin nhắn..."
        />
        <button className="ml-2 p-2 bg-blue-600 text-white rounded" onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
