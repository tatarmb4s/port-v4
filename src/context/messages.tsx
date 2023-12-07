import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Message } from '../lib/validators/message';
import { nanoid } from 'nanoid';

export const MessagesContext = createContext<{
    messages: Record<string, Message>;
    isMessageUpdating: boolean;
    addMessage: (message: Message) => void;
    removeMessage: (id: string) => void;
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
    setIsMessageUpdating: (isUpdating: boolean) => void;
    tryAddMessage: (message: Message) => void;
}>({
    messages: {},
    isMessageUpdating: false,
    addMessage: () => {},
    removeMessage: () => {},
    updateMessage: () => {},
    setIsMessageUpdating: () => {},
    tryAddMessage: () => {},
});

export function MessagesProvider({children}:{children: ReactNode}) {
    
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
    const [messages, setMessages] = useState<Record<string, Message>>({
        [nanoid()]: {
            id: nanoid(),
            text: "Szia! Miben segíthetek?",
            isUserMessage: false,
            newlyAdded: false,
        }
    });

    const addMessage = (message: Message) => {
        console.log("anyás");
        if (!messages[message.id]) {
            console.log("addMessage", message);
            setMessages((prev) => ({...prev, [message.id]: message}));
            console.log(messages);
        } else {
            console.log("The message exists");
        }
    }
    
    const removeMessage = (id: string) => {
        const {[id]: _, ...rest} = messages;
        setMessages(rest);
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        console.log("updateMessage", id);
        if (messages[id]) {
            setMessages((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    text: updateFn(prev[id].text),
                },
            }));
        }
    }

    const tryAddMessage = (message: Message) => {
        if (!messages[message.id]) {
            console.log("tryAddMessage", message);
            setMessages((prev) => ({...prev, [message.id]: message}));
            console.log(messages);
        } else {
            console.log("The message already exists");
        }
    }

    return(
        <MessagesContext.Provider value={{
            messages,
            isMessageUpdating,
            addMessage,
            removeMessage,
            updateMessage,
            setIsMessageUpdating,
            tryAddMessage,
        }}>
            {children}
        </MessagesContext.Provider>
    )
}

