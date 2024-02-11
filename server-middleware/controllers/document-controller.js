const DocumentService = require('../services/document-service.js')

module.exports = new class DocumentController {
  async create(req, res, next) {
    try {
      const document = await DocumentService.create(req.file, req.headers.origin)

      return res.json(document)
    } catch (error) {
      next(error)
    }
  }

  download(req, res, next) {
    try {
      const file = DocumentService.download(req.params?.filename)

      res.download(file, (error) => {
        if (error) {
          next(error)
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async signup (req, res, next) {
    try {
      await DocumentService.signup(req?.body || {})

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async verify (req, res, next) {
    try {
      const token = await DocumentService.verify(req?.body || {})

      res.cookie('inforphere_access_token', token, { maxAge: 60 * 60 * 24 * 180, httpOnly: true })

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async get (req, res, next) {
    try {
      const document = await DocumentService.get(req.user)

      if (!document) {
        res.clearCookie('inforphere_access_token')
      }

      res.json(document)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    try {
      await DocumentService.delete(req.user)

      res.clearCookie('inforphere_access_token')

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      const { token, ...document } = await DocumentService.update(req.user, req.file)

      res.cookie('inforphere_access_token', token, { maxAge: 60 * 60 * 24 * 180, httpOnly: true })

      res.json(document)
    } catch (error) {
      next(error)
    }
  }

  async signin (req, res, next) {
    try {
      const { token, ...document } = await DocumentService.signin(req?.body || {})

      res.cookie('inforphere_access_token', token, { maxAge: 60 * 60 * 24 * 180, httpOnly: true })

      res.json(document)
    } catch (error) {
      next(error)
    }
  }

  async clear (_, res, next) {
    try {
      res.clearCookie('inforphere_access_token')
      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async form (req, res, next) {
    try {
      await DocumentService.form(req?.body || {})
      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async activate (req, res, next) {
    try {
      const document = await DocumentService.activate(req.user, req?.body || {})
      res.json(document)
    } catch (error) {
      next(error)
    }
  }

  async excel (req, res, next) {
    try {
      await DocumentService.excel()
      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }
}