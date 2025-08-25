const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface IngestionRequest {
  source_id: string;
  articles: {
    title: string;
    content: string;
    url: string;
    date: string;
  }[];
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

    const { source_id, articles }: IngestionRequest = await req.json();

    if (!source_id || !articles || !Array.isArray(articles)) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Simulate AI processing
    const processedArticles = [];
    
    for (const article of articles) {
      // Simulate sentiment analysis
      const sentiments = ['positive', 'negative', 'neutral'];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      
      // Simulate embedding generation (normally would call OpenAI API)
      const embedding = Array.from({ length: 1536 }, () => Math.random() - 0.5);
      
      processedArticles.push({
        source_id,
        title: article.title,
        content: article.content,
        url: article.url,
        date: article.date,
        sentiment,
        embedding
      });
    }

    // In real implementation, would save to database here
    console.log('Processed articles:', processedArticles.length);

    // Generate trend alerts if significant activity detected
    const alerts = [];
    if (processedArticles.length > 5) {
      alerts.push({
        insight: `High activity detected: ${processedArticles.length} new articles from source`,
        trend_score: Math.random() * 10,
        sentiment: processedArticles.filter(a => a.sentiment === 'positive').length > processedArticles.length / 2 ? 'positive' : 'neutral'
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: processedArticles.length,
        alerts: alerts.length
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Data ingestion error:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});