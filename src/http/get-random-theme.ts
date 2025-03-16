import { api } from "../lib/axios";

export interface openAIResponse {
  success: boolean;
  response?: any;
  error?: string;
}

/**
 * Get a random theme from OpenAI API
 * @returns object containing success status, response data if successful, and error message if failed
 */


// remember to add the env on vercel
export async function getRandomTheme(): Promise<openAIResponse> {
  try {
    const openAIReq = api.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content:
              "Crie um tema engraçado e aleatório para alguém escrever um texto divertido.",
          },
        ],
        temperature: 0.9,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    const { data, status } = await openAIReq;

    if (status !== 200) {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }

    const themeGenerated = data.choices[0].message.content.trim();

    return {
      success: true,
      response: themeGenerated,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during the request",
    };
  }
}
