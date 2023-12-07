// @ts-ignore
import { MessagesProvider } from "../context/messages.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useEffect, useState } from "react";
import { getSocket } from "./WebSocketClient";
import React from "react";


interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {

    const queryClient = new QueryClient();
    return (

        // <RoomContext.Provider value={{selectedRoom, setSelectedRoom, livingroom, setlivingroom, DiningRoom, setDiningRoom, bathroom, setbathroom, bedroom, setbedroom, smallroom, setsmallroom, kitchen, setkitchen, laptopMode, setLaptopMode}}>
            <QueryClientProvider client={queryClient}>
                <MessagesProvider>{children}</MessagesProvider>
            </QueryClientProvider>
    
        // </RoomContext.Provider>


    );
};

export default Providers;
