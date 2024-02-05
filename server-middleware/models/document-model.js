import mongoose from "mongoose"

const DocumentModel = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true
  },
  fileName: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  activeAt: {
    type: Number,
    default: 0
  },
  tarif: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model.Document || mongoose.model('Document', DocumentModel)