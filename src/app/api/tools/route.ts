export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed, only POST requests are accepted.",
      }),
      { status: 405 }
    );
  }

  const messages = await req.json();

  // Simple function detection for Gemini
  const detectFunction = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (message.includes('weather') || message.includes('temperature')) {
      const locationMatch = message.match(/weather.*?in\s+([a-zA-Z\s]+)/i) ||
        message.match(/temperature.*?in\s+([a-zA-Z\s]+)/i);
      const location = locationMatch ? locationMatch[1].trim() : 'New York';
      return { mode: 'weather', arg: JSON.stringify({ location }) };
    }

    if (message.includes('stock') || message.includes('share') || message.includes('ticker')) {
      const symbolMatch = message.match(/\b([A-Z]{1,5})\b/) ||
        message.match(/stock\s+([a-zA-Z]+)/i);
      const symbol = symbolMatch ? symbolMatch[1].toUpperCase() : 'AAPL';
      return { mode: 'stock', arg: JSON.stringify({ symbol }) };
    }

    if (message.includes('define') || message.includes('meaning') || message.includes('dictionary')) {
      const wordMatch = message.match(/define\s+([a-zA-Z]+)/i) ||
        message.match(/meaning.*?of\s+([a-zA-Z]+)/i);
      const word = wordMatch ? wordMatch[1] : message.split(' ').pop();
      return { mode: 'dictionary', arg: JSON.stringify({ word }) };
    }

    if (message.includes('search') || message.includes('find') || message.includes('look up')) {
      return { mode: 'search', arg: '' };
    }

    return { mode: 'chat', arg: '' };
  };

  try {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content;

    // Detect function based on user input
    const result = detectFunction(userMessage);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error processing tools request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the input" }),
      { status: 500 }
    );
  }
}
