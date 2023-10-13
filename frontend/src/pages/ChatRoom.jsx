import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function ChatRoom() {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState(''); // Store the current chat room
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userJoined', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('userLeft', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const handleSendMessage = () => {
        const messageData = { room, message: `${username}: ${message}` };
        socket.emit('message', messageData);
        setMessage('');
    };

    const handleJoinRoom = () => {
        socket.emit('join', { room, username });
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Chat Room</h1>
            </div>
            <div className="flex p-4">
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter the chat room name"
                    className="ml-2 px-2 py-1 border border-gray-300 rounded"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button
                    onClick={handleJoinRoom}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Join Room
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {receivedMessages.map((msg, index) => (
                    <div key={index} className="mb-2">{msg}</div>
                ))}
            </div>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Enter your message"
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
