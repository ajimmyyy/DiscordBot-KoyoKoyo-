import { GoogleGenerativeAI} from "@google/generative-ai";

const TOKEN = process.env.GOOGLE_API_TOKEN || "";
export const gemini = new GoogleGenerativeAI(TOKEN);