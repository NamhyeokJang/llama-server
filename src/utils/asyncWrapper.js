export const asyncWrapper = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
      next()
    } catch (ex) {
      next(ex)
    }
  }
}
