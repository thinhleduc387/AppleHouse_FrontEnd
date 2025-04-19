import {
    io
} from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

const socket = io(SOCKET_SERVER_URL, {
    reconnectionAttempts: 5,
    timeout: 10000,
    autoConnect: true,
});

export const registerUser = (userId, token = null) => {
    if (!socket.connected) {
        socket.connect();
    }

    socket.on("connect", () => {
        console.log("Connected to socket server with ID:", socket.id);
        socket.emit("authenticate", {
            userId,
            token,
        });
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error.message);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
    });
};

// Xuất socket để sử dụng ở nơi khác nếu cần
export default socket;