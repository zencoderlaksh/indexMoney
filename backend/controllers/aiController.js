const { GoogleGenerativeAI } = require("@google/generative-ai");

const getShareInsights = async (req, res, next) => {
  try {
    const { company } = req.body;
    
    if (!company) {
      return res.status(400).json({ error: "Company name is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a financial analyst expert. 
Provide a concise, up-to-date summary and key insights about the unlisted stock / company: "${company}".
Include the following if available:
- A brief overview of the company and its core business.
- Recent news, growth metrics, or financial performance.
- Any IPO plans, rumors, or grey market premium (GMP) trends if applicable.
- Key strengths and potential risks.

Format the response in clean, easy-to-read Markdown. Use bullet points and bold text where appropriate. Keep it professional and under 400 words. Do not include any disclaimers about being an AI.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      data: {
        company,
        insights: text,
      }
    });

  } catch (error) {
    console.error("Error fetching AI insights:", error);
    res.status(500).json({ error: "Failed to fetch AI insights. Please try again later." });
  }
};

module.exports = {
  getShareInsights,
};
