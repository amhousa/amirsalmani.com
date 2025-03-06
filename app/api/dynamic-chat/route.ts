import { NextResponse } from "next/server"
import Together from "together-ai"

export async function POST(request: Request) {
  try {
    const { messages, systemPrompt } = await request.json()

    if (!process.env.TOGETHER_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    })

    // Prepare the chat messages including system prompt if provided
    const chatMessages = [
      ...(systemPrompt
        ? [{ role: "system", content: systemPrompt }]
        : [{ role: "system", content: "name: Amir Salmani, profession: developer and consultant" }]),
      ...messages,
    ]

    const response = await together.chat.completions.create({
      messages: chatMessages,
      model: "deepseek-ai/DeepSeek-V3",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<｜end▁of▁sentence｜>"],
      safety_model: "meta-llama/Meta-Llama-Guard-3-8B",
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in dynamic chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

