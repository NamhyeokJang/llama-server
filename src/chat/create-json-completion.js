import Ajv from 'ajv'
import {
  LlamaModel,
  LlamaChatSession,
  LlamaContext,
  LlamaJsonSchemaGrammar,
} from 'node-llama-cpp'

/**
 * @param {LlamaModel} model
 * @param {string} prompt
 * @param {object} schema jsonSchema
 */
export async function createJsonCompletion(model, prompt, schema) {
  try {
    new Ajv({ strict: true }).compile(schema)
  } catch (ex) {
    throw new Error(`[ERROR][INVALID JSON SCHEMA] ${ex.message}`)
  }

  const grammar = new LlamaJsonSchemaGrammar(schema)
  const context = new LlamaContext({ model, grammar })
  const session = new LlamaChatSession({ context })

  const response = await session.prompt(prompt)

  try {
    return JSON.parse(response)
  } catch (ex) {
    console.error(`[ERROR][RESPONSE] invalid json error`)
    return {}
  }
}
