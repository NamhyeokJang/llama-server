import path from 'path'
import env from 'env-var'
const { get } = env

export const MODEL_BASE_PATH = get('MODEL_BASE_PATH')
  .default(path.join(process.cwd(), 'model'))
  .asString()

export const LLM_MODEL = {
  MISTRAL_7B_OPEN_ORCA_4Q: 'mistral-7b-openorca.Q4_0.gguf',
  MISTRAL_7B_INSTRUCT_2Q: 'mistral-7b-instruct-v0.1.Q2_K.gguf',
  MISTRAL_7B_INSTRUCT_4Q: 'mistral-7b-instruct-v0.1.Q4_K_M.gguf',
  LLAMA2_7B_CHAT_Q2: 'llama-2-7b-chat.Q2_K.gguf',
  LLAMA2_7B_CHAT_Q4: 'llama-2-7b-chat.Q4_K_M.gguf',
  ZEPHYR_7B_2Q: 'zephyr-7b-beta.Q2_K.gguf',
  ZEPHYR_7B_4Q: 'zephyr-7b-beta.Q4_K_M.gguf',
}
