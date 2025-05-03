import { NextResponse } from "next/server"
import Together from "together-ai"

export const runtime = "edge"

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

    // Create a streaming response
    const stream = await together.chat.completions.create({
      messages: chatMessages,
      model: "deepseek-ai/DeepSeek-V3",
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stop: ["<｜end of sentence｜>"],
      safety_model: "meta-llama/Meta-Llama-Guard-3-8B",
      stream: true,
    })

    // Create a TransformStream to convert the Together AI stream to a ReadableStream
    const encoder = new TextEncoder()
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    // Process the stream
    ;(async () => {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ""
          const data = encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
          await writer.write(data)
        }

        // Send a final [DONE] message
        const doneMessage = encoder.encode(`data: [DONE]\n\n`)
        await writer.write(doneMessage)

        await writer.close()
      } catch (error) {
        console.error("Error processing stream:", error)
        const errorMessage = encoder.encode(`data: ${JSON.stringify({ error: "Stream processing error" })}\n\n`)
        await writer.write(errorMessage)
        await writer.close()
      }
    })()

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in chat stream API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
