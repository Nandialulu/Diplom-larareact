import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat({ conversationId, initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");

  useEffect(() => {
    window.Echo.channel(`chat.${conversationId}`)
      .listen("MessageSent", (e) => {
        setMessages((prev) => [...prev, e.message]);
      });

    return () => {
      window.Echo.leave(`chat.${conversationId}`);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    const res = await axios.post("/messages/send", {
      conversation_id: conversationId,
      message: text,
    });

    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <div className="p-4 border rounded-2xl">
      <div className="h-64 overflow-y-auto mb-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-2 ${
              m.sender_id === user.id ? "text-right" : "text-left"
            }`}
          >
            <span className="bg-gray-200 px-3 py-1 rounded-xl">
              {m.message}
            </span>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border w-full p-2 rounded-xl"
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2 mt-2 rounded-xl"
      >
        Send
      </button>
    </div>
  );
}