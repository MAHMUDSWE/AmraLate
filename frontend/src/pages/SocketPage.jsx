import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://127.0.0.1:3000/"); // Replace with your server URL

function SocketPage() {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('Received message:', message);
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <h1>Socket.io Chat</h1>
            <div>
                {receivedMessages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        style={{
                            width: '300px',
                            border: '1px solid black',
                            padding: '10px',
                        }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </form>
                <button type='submit'>Send</button>
            </div>
        </div>
    );
}

export default SocketPage;
