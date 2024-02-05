const router = require('express').Router()
const uploadMiddleware = require('../middlewares/upload-middleware.js')
const DocumentController = require('../controllers/document-controller.js')
const authMiddleware = require('../middlewares/auth-middleware.js')

router.post('/document/create', uploadMiddleware, DocumentController.create)
router.post('/document/signup', DocumentController.signup)
router.post('/document/verify', DocumentController.verify)
router.post('/document/signin', DocumentController.signin)
router.post('/document/clear', DocumentController.clear)
router.post('/document/form', DocumentController.form)
router.post('/document/activate', authMiddleware, DocumentController.activate)
router.post('/document/excel', DocumentController.excel)
router.get('/document/download/:filename', DocumentController.download)
router.get('/document', authMiddleware, DocumentController.get)
router.delete('/document', authMiddleware, DocumentController.delete)
router.put('/document', authMiddleware, uploadMiddleware, DocumentController.update)

module.exports = router