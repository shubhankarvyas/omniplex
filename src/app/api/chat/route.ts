import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Convert messages to Gemini format
    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage.content;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Create a simple stream response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response("Error generating response", { status: 500 });
  }
}
