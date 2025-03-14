import { client } from "../database/client";
import { User } from "./get-user";

export interface Room {
  id: string;
  user_id: string;
  name: string;
  theme: string;
  stage: RoomStage;
  users: User[];
  votes: { [key: string]: string } | null;
  finished_participants: User[];
  writing_start_time: string | null;
  vote_start_time: string | null;
  started_at: string | null;
  created_at: string;
}

export enum RoomStage {
  WAITING = "WAITING",
  WRITING = "WRITING",
  VOTING = "VOTING",
  RESULTS = "RESULTS",
  FINISHED = "FINISHED",
}

/**
 * Get all available rooms from the database
 * @returns An array of rooms
 */
export async function getRooms(): Promise<Room[]> {
  try {
    const { data, error } = await client
      .from("rooms")
      .select("*")
      .eq("stage", RoomStage.WAITING)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching rooms:", error);
      return [];
    }

    return data || [];
  } catch (err: any) {
    console.error("Unexpected error in getRooms:", err.message);
    return [];
  }
}

/**
 * Get rooms filtered by stage
 * @param stage The stage to filter by
 * @returns An array of rooms in the specified stage
 */
export async function getRoomsByStage(stage: RoomStage): Promise<Room[]> {
  try {
    const { data, error } = await client
      .from("rooms")
      .select("*")
      .eq("stage", stage)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching rooms with stage ${stage}:`, error);
      return [];
    }

    return data as Room[];
  } catch (err: any) {
    console.error("Unexpected error in getRoomsByStage:", err.message);
    return [];
  }
}

/**
 * Get rooms created by a specific user
 * @param userId The ID of the user who created the rooms
 * @returns An array of rooms created by the specified user
 */
export async function getRoomsByUserId(userId: string): Promise<Room[]> {
  try {
    const { data, error } = await client
      .from("rooms")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching rooms for user ${userId}:`, error);
      return [];
    }

    return data as Room[];
  } catch (err: any) {
    console.error("Unexpected error in getRoomsByUserId:", err.message);
    return [];
  }
}

/**
 * Get a specific room by ID
 * @param roomId The ID of the room to fetch
 * @returns The room object if found, null otherwise
 */
export async function getRoomById(roomId: string): Promise<Room | null> {
  try {
    const { data, error } = await client
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();

    if (error) {
      console.error(`Error fetching room ${roomId}:`, error);
      return null;
    }

    return data as Room;
  } catch (err: any) {
    console.error("Unexpected error in getRoomById:", err.message);
    return null;
  }
}

/**
 * Get rooms that a user is participating in (via the users array)
 * @param userId The ID of the participating user
 * @returns An array of rooms where the user is a participant
 */
export async function getRoomsByParticipant(userId: string): Promise<Room[]> {
  try {
    const { data, error } = await client
      .from("rooms")
      .select("*")
      .contains("users", [{ id: userId }]);

    if (error) {
      console.error(`Error fetching rooms for participant ${userId}:`, error);
      return [];
    }

    return data as Room[];
  } catch (err: any) {
    console.error("Unexpected error in getRoomsByParticipant:", err.message);
    return [];
  }
}
