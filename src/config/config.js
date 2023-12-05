import env from 'env-var'
const { get } = env

export const CONFIG = {
  PORT: get('PORT').default(4001).asPortNumber(),
}
