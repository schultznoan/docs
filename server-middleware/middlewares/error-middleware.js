const ApiError = require('../exceptions/error-api.js')

module.exports = function (error, _req, res, _next) {
  const { status, message, errors } = error

  console.error(error)

  if (error instanceof ApiError) {
    
    return res
      .status(status)
      .json({ message, errors })
  }

  return res
    .status(500)
    .json({ message: 'Произошла ошибка сервера', errors: {} })
}