const ApiError = require('../exceptions/error-api.js')
const DocumentService = require('../services/document-service.js')

module.exports = function (req, res, next) {
    try {
      const accessToken = req.cookies.inforphere_access_token

      if (!accessToken) {
        res.clearCookie('inforphere_access_token')
        next(ApiError.UnauthorizedError())
  
        return
      }
  
      const userData = DocumentService.validateToken(accessToken)

      req.user = userData
  
      next()
    } catch {
        res.clearCookie('inforphere_access_token')
        next(ApiError.UnauthorizedError())
    }
  }