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

export const joinChatRoom = (roomId) => {
    if (!socket.connected) {
        socket.connect();
    }

    socket.emit("joinRoom", {
        roomId
    });
    console.log(`Joined room ${roomId}`);
};

export const sendMessage = ({
    roomId,
    senderId,
    content,
    messageType = "text",
    imageUrl = null
}) => {
    if (!socket.connected) {
        console.warn("Socket not connected");
        return;
    }

    socket.emit("sendMessage", {
        roomId,
        senderId,
        content,
        messageType,
        imageUrl,
    });
};

export const onNewMessage = (callback) => {
    socket.on("newMessage", callback);
};

export default socket;