import { LLM_MODEL, MODEL_BASE_PATH } from './constant.js'
import { LlamaModel } from 'node-llama-cpp'
import path from 'path'

export const getLLM = (model = LLM_MODEL.MISTRAL_7B_INSTRUCT_4Q) => {
  return new LlamaModel({ modelPath: path.join(MODEL_BASE_PATH, model) })
}
