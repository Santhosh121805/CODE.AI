import { OpenAI } from "openai";
import { LLMChain } from "langchain";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runLangChain = async (prompt) => {
  const chain = new LLMChain({ llm: openai, prompt });
  const response = await chain.call({ input: prompt });
  return response.output_text || response.text;
};
