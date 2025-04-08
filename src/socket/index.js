// src/socket.js
import {
    io
} from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

// Khởi tạo socket
const socket = io(SOCKET_SERVER_URL, {
    autoConnect: false,
    cors: {
        origin: "http://localhost:5173",
    },
});

export const registerUser = (userId) => {
    socket.emit('register', userId)
}

export default socket;