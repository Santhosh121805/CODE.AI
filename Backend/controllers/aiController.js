import { runLangChain } from "../services/langchainService.js";

export const runWorkflow = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt required" });

    const result = await runLangChain(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
