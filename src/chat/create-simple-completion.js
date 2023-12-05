import { LlamaChatSession, LlamaContext, LlamaModel } from 'node-llama-cpp'

/**
 * @param {LlamaModel} model
 * @param {string} prompt
 * @param {string | undefined} systemPrompt
 * @typedef {Object} ConversationHistory
 * @property {string} prompt - The prompt text.
 * @property {string} response - The response text.
 * @param {Array<ConversationHistory>} histories
 */
export function createSimpleCompletion(
  model,
  prompt,
  histories = [],
  systemPrompt,
) {
  const context = new LlamaContext({ model })
  const session = new LlamaChatSession({
    context,
    conversationHistory: histories,
    systemPrompt,
  })
  return session.prompt(prompt)
}
