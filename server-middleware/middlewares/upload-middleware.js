const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, '../', 'uploads'))
    },
    filename: function (_req, file, cb) {
        cb(null, 'file-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

module.exports = upload.single('pdf_file')