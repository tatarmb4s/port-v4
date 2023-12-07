import exp from "constants";
import {z} from "zod";
import { RoomSchema } from "./houseData";

export const MessageSchema = z.object({
    id: z.string(),
    isUserMessage: z.boolean(),
    text: z.string(),
    newlyAdded: z.boolean(),
});

export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;

export const MessageRespone = z.object({
    msgs: MessageArraySchema,
    lastResp: z.string(),
    id: z.string(),
    finished: z.boolean(),
});

export type MessageResponse = z.infer<typeof MessageRespone>;

export const AIReqRespone = z.object({
    msgs: MessageArraySchema,
    id: z.string(),
    houseData: z.record(z.string(), RoomSchema),
    currentLocation: z.string(),
});

export type AIReqRespone = z.infer<typeof AIReqRespone>;

//array validator