import exp from "constants";
import { z } from "zod";

export const RoomSchema = z.object({
    id: z.string(),
    name: z.string(),
    devices: z.record(z.string(),
        z.object({
            devId: z.string(),
            devName: z.string(),
            devType: z.string(),
            devState: z.boolean(),
            devValue: z.string(),
            devMetadata: z.string(),
            devMode: z.string(),
        })
    ),
    temperature: z.number(),
    isColing: z.number(),
});

export type Room = z.infer<typeof RoomSchema>;

export const HouseDataSchema = z.object({
    rooms: z.record(z.string(), RoomSchema),
    selectedRoom: z.string(),
});

export type HouseData = z.infer<typeof HouseDataSchema>;