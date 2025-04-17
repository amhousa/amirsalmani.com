import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!process.env.TOGETHER_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Create a stream response
    const encoder = new TextEncoder()
    const { readable, writable } = new TransformStream()
    const writer = writable.getWriter()

    // Process the request in the background
    ;(async () => {
      try {
        // Call Together API
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
            messages: messages,
            temperature: 0.99,
            seed: 999,
            safety_model: "meta-llama/Meta-Llama-Guard-3-8B",
            stream: true,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Together API error: ${response.status} ${errorText}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("Response body is null")

        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                if (line.includes("[DONE]")) continue

                const data = JSON.parse(line.slice(6))
                if (data.choices && data.choices[0]?.delta?.content) {
                  const content = data.choices[0].delta.content
                  const dataToSend = encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                  await writer.write(dataToSend)
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error in chat API:", error)
        const errorMessage = encoder.encode(`data: ${JSON.stringify({ error: "Error processing request" })}\n\n`)
        await writer.write(errorMessage)
      } finally {
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
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
