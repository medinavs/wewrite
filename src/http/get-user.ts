import { client } from "../database/client";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

/**
 * Get the currently authenticated user's data from the database
 * @returns The user object if found, null if not authenticated or error
 */
export async function getUser(): Promise<User | null> {
  try {
    // Get the currently authenticated user
    const { data: authData } = await client.auth.getUser();

    if (!authData?.user) {
      return null;
    }

    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }

    return {
      ...data,
      id: authData.user,
    };
  } catch (err: any) {
    console.error("Unexpected error in getUser:", err.message);
    return null;
  }
}

/**
 * Get user data by specific ID
 * @param userId The user ID to look up
 * @returns The user object if found, null if not found or error
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { data, error } = await client
      .from("users")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }

    return data as User;
  } catch (err: any) {
    console.error("Unexpected error in getUserById:", err.message);
    return null;
  }
}
