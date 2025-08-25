const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface SearchRequest {
  query: string;
  limit?: number;
  similarity_threshold?: number;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { query, limit = 10, similarity_threshold = 0.7 }: SearchRequest = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Simulate embedding generation for query (normally would call OpenAI API)
    const queryEmbedding = Array.from({ length: 1536 }, () => Math.random() - 0.5);

    // Mock search results (in real implementation, would query database with vector similarity)
    const mockResults = [
      {
        id: "1",
        title: "OnePlus 13 Launch Event Announced for India",
        content: "OnePlus has officially announced the launch date for OnePlus 13 in India...",
        url: "https://gadgets360.com/oneplus-13-launch-india",
        date: "2024-12-28",
        sentiment: "positive",
        similarity_score: 0.95,
        source: { name: "Gadgets360", type: "news" }
      },
      {
        id: "2", 
        title: "Xiaomi Market Share Analysis Q4 2024",
        content: "Latest market research shows Xiaomi's position in Indian smartphone market...",
        url: "https://91mobiles.com/xiaomi-market-analysis",
        date: "2024-12-27",
        sentiment: "neutral",
        similarity_score: 0.87,
        source: { name: "91Mobiles", type: "news" }
      }
    ].filter(result => result.similarity_score >= similarity_threshold)
     .slice(0, limit);

    return new Response(
      JSON.stringify({
        query,
        results: mockResults,
        total: mockResults.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Semantic search error:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});