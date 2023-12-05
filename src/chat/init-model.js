import { MODEL_BASE_PATH } from './constant.js'
import { LlamaModel } from 'node-llama-cpp'
import path from 'path'
import fs from 'fs'
import util from 'util'

export const initModel = async model => {
  if (model) {
    const exists = await util.promisify(fs.exists)(
      path.join(MODEL_BASE_PATH, model),
    )
    if (!exists) {
      throw new Error(`[ERROR] not found ${model} `)
    }
  } else {
    const models = (await util.promisify(fs.readdir)(MODEL_BASE_PATH)).filter(
      v => v.endsWith('.gguf'),
    )
    if (models.length === 0) {
      throw new Error(`[Error] not found model in ${MODEL_BASE_PATH}`)
    }
    model = models[0]
  }

  return {
    model: new LlamaModel({ modelPath: path.join(MODEL_BASE_PATH, model) }),
    name: model,
  }
}
