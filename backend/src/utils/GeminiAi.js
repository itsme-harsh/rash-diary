import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define an async function to handle the content generation
export async function generateStory(name, relation, type) {
    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Define the prompt
        const prompt = `
        make a birthday wish for ${name} with the following options:
        Relation: friend
        Number of lines: 3 to 5
        Type of wish: Funny,
        with appropriate emojis`;
        // Type of wish: Heartfelt, Funny, Inspirational, Short].`;

        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Output the result
        return result.response.text();

    } catch (error) {

        console.error("Error generating content:", error);
    }
}

// Call the async function
// generateStory(name);
