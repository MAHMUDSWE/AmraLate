import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function ChatPage() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        // Set up socket.io event listeners to receive updates on connected users and chat rooms
        socket.on('connectedUsers', (users) => {
            setConnectedUsers(users);
        });

        socket.on('chatRooms', (rooms) => {
            setChatRooms(rooms);
        });
    }, []);

    const handleCreateChatRoom = () => {
        // Create a new chat room with the selected users
        const newChatRoom = {
            name: room,
            users: selectedUsers,
        };
        socket.emit('createChatRoom', newChatRoom);
        setRoom('');
        setSelectedUsers([]);
    };

    const handleUserSelection = (user) => {
        // Toggle user selection
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(user)
                ? prevSelectedUsers.filter((u) => u !== user)
                : [...prevSelectedUsers, user]
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl font-bold">Chat Page</h1>
            </div>
            <div className="flex p-4">
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold">Connected Users</h2>
                <ul>
                    {connectedUsers.map((user) => (
                        <li
                            key={user}
                            className={`cursor-pointer ${
                                selectedUsers.includes(user)
                                    ? 'text-blue-600'
                                    : 'text-gray-700'
                            }`}
                            onClick={() => handleUserSelection(user)}
                        >
                            {user}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold">Create Chat Room</h2>
                <input
                    type="text"
                    placeholder="Enter chat room name"
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button
                    onClick={handleCreateChatRoom}
                    className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Create Chat Room
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold">Chat Rooms</h2>
                <ul>
                    {chatRooms.map((chatRoom) => (
                        <li key={chatRoom.name}>{chatRoom.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChatPage;
