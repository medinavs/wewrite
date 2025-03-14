import { client } from "../database/client";

export interface SignUpCredentials {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface SignUpResponse {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * sign up a user using email, password, name and avatar
 * @param credentials object containing email, password, name and avatar
 * @returns object containing success status, user data if successful, and error message if failed
 */
export async function signUp(
  credentials: SignUpCredentials
): Promise<SignUpResponse> {
  try {
    const { data: authData, error: authError } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) {
      return {
        success: false,
        error:
          authError.message === "Invalid signUp credentials"
            ? "Campos Inválidos"
            : authError.message,
      };
    }

    if (!authData?.user?.id) {
      return {
        success: false,
        error: "Failed to create user account",
      };
    }

    const { error: profileError } = await client.from("users").insert({
      id: authData.user.id,
      email: credentials.email,
      name: credentials.name,
      avatar: credentials.avatar,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      return {
        success: false,
        error: profileError.message,
      };
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during sign up",
    };
  }
}
