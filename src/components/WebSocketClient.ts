import { useEffect, FC } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
    socket = io("https://ws.t42.hu:6969");
};

export const getSocket = () => socket;

interface WebSocketClientProps {
    onDataReceived: (data: any) => void;
    onDataFinished: (data: any) => void;
}

const WebSocketClient: FC<WebSocketClientProps> = ({
    onDataReceived,
    onDataFinished,
}) => {
    useEffect(() => {
        const socket = getSocket();

        socket.on("my response", (data: any) => {
            console.log(data);
            onDataReceived(data);
        });
        socket.on("my final response", (data: any) => {
            console.log(data);
            onDataFinished(data);
        });

        socket.on("message", (data: any) => {
            onDataReceived(data);
        });

        return () => {
            socket.off("my response");
            socket.off("my final response");
            socket.off("message");
        };
    }, [onDataReceived, onDataFinished]);

    return null;
};

export default WebSocketClient;
