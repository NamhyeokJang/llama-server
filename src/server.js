import express from 'express'
import morgan from 'morgan'
import { CONFIG } from './config/config.js'
import { createSimpleCompletion } from './chat/create-simple-completion.js'
import { getLLM } from './chat/get-model.js'
import { LLM_MODEL } from './chat/constant.js'
import { createJsonCompletion } from './chat/create-json-completion.js'
import { asyncWrapper } from './utils/asyncWrapper.js'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

const model = getLLM(LLM_MODEL.MISTRAL_7B_INSTRUCT_4Q)

app.get('/health-check', (req, res) => {
  return res.json({ ok: 1 })
})

app.post(
  '/chat',
  asyncWrapper(async (req, res) => {
    const { prompt, histories } = req.body

    const response = await createSimpleCompletion(model, prompt, histories)

    return res.json({ response })
  }),
)

app.post(
  '/json',
  asyncWrapper(async (req, res) => {
    const { prompt, schema } = req.body

    const response = await createJsonCompletion(model, prompt, schema)

    return res.json({ data: response })
  }),
)

app.use((err, req, res, next) => {
  console.error(err)
  return res.status(400).json({ message: err.message })
})

app.listen(CONFIG.PORT)

console.log(`START LLAMA SERVER => PORT:${CONFIG.PORT}`)
