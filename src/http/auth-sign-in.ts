import { client } from "../database/client";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean;
  user?: any;
  token: string;
  error?: string;
}

/**
 * sign in a user using email and password
 * @param credentials user's email and password
 * @returns object containing success status, user data if successful, and error message if failed
 */
export async function signIn(
  credentials: SignInCredentials
): Promise<SignInResponse> {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return {
        success: false,
        error:
          error.message === "Invalid login credentials"
            ? "Usúario ou senha inválidos"
            : error.message,
        token: "",
      };
    }

    return {
      success: true,
      user: data.user,
      token: data.session.access_token,
    };
  } catch (err: any) {
    return {
      token: "",
      success: false,
      error: err.message || "An unexpected error occurred during sign in",
    };
  }
}
