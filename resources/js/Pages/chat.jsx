import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Pusher from "pusher-js";

export default function Chat() {
    const { auth } = usePage().props;

    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('54890acba9c993fbac43', {
            cluster: 'ap3'
        });

        const channel = pusher.subscribe('chat');

        channel.bind('message', function(data) {
            setMessages(prev => [...prev, data]); //зөв
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        await fetch('http://127.0.0.1:8000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender_id: username || auth?.user?.name,
                message: message
            })
        });

        setMessage(""); 
    };

    return (
        <div className="max-w-2xl mx-auto p-4">

            <input
                className="text-xl font-bold mb-4 border p-2 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
            />

            <div className="h-[400px] overflow-y-auto border p-3 rounded">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.sender_id}</strong>
                        <div>{msg.message}</div>
                    </div>
                ))}
            </div>

            <form onSubmit={submit} className="mt-3 flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border flex-1 p-2 rounded"
                />
                <button className="bg-blue-500 text-white px-4 rounded">
                    Send
                </button>
            </form>
        </div>
    );
}