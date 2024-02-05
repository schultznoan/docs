import mongoose from "mongoose"

const DocumentModel = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Document'
  },
  verifyAuthor: {
    type: String,
    required: true
  },
  verifyAddresse: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model.DocumentAuth || mongoose.model('Document_Verify', DocumentModel)