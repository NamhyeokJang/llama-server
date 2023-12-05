## LLAMA SERVER

### 라이브러리
- express
- [node-llama-ccp](https://withcatai.github.io/node-llama-cpp/guide/)

### 환경변수
- PORT : 서버 PORT
- MODEL_BASE_PATH : LLAMA 모델 디렉토리 경로

### 모델 다운
GGUF Model 사용을 권장

[Hugging Face](https://huggingface.co/TheBloke?search_models=GGUF) 에서 사용하고 싶은 모델 다운받으면 됨

추천 모델
- mistral-7b-openorca.Q4_0.gguf
- mistral-7b-instruct-v0.1.Q2_K.gguf
- mistral-7b-instruct-v0.1.Q4_K_M.gguf
- llama-2-7b-chat.Q2_K.gguf
- llama-2-7b-chat.Q4_K_M.gguf
- zephyr-7b-beta.Q2_K.gguf
- zephyr-7b-beta.Q4_K_M.gguf

### 실행 방법
> 권장사항: 최소 RAM 8GB 권장
> 
> 그래픽카드가 장착되어 있지 않은 intel 또는 AMD 머신일 경우 아래 프로젝트 루트 경로에 아래 명령어를 통해서 Metal Disable 설정
>  ```bash
> npx --no node-llama-cpp download --no-metal
> ```

다운받은 GGUF 모델을 `{root}/model` 경로에 넣고 아래 명령어 수행
```bash
pnpm start:dev
```

## API
### GET /health-check
response
```json
{
  "ok": 1,
  "name": "사용중인 LLM model"
}
```

### POST /chat 
request
```
{
  "prompt": string (required)
  "histories": Array<{ "prompt": string, "response": string }> (optional)
}
```
response 
```
{
    "response": string 
}
```

### POST /json
request
```
{
    "prompt": string (required)
    "schema": object (required) - json schema 정의
}
```
response 
```
{
    "data": object
}
```




