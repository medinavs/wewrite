import { client } from "../database/client";

export interface signOutResponse {
  success: boolean;
  error?: string;
}

/**
 * sign out the current user
 * @param token the user's token
 * @returns object containing success status and error message if failed
 */
export async function signOut(): Promise<signOutResponse> {
  try {
    const { error } = await client.auth.signOut({
      scope: "local",
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during sign out",
    };
  }
}
