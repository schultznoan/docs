const path = require('path')
const randomstring = require('randomstring')
const jwt = require('jsonwebtoken')
const iconv = require('iconv-lite')

const DocumentModel = require('../models/document-model.js')
const DocumentAuthModule = require('../models/document-auth-model.js')
const DocumentVerifyModel = require("../models/document-verify-model.js")
const ApiError = require('../exceptions/error-api.js')
const FormModel = require('../models/form-model.js')
const nodemailer = require('nodemailer')
const ExcelJS = require('exceljs')

class DocumentService {
  async create (file, host) {
    const document = await DocumentModel.create({
      link: host + '/link/' + randomstring.generate(7),
      fileName: file.filename,
      title: iconv.decode(file.originalname, 'utf-8'),
      createdAt: Date.now()
    })

    return document
  }

  download (filename) {
    if (!filename) {
      throw ApiError.BadRequest('Отсутствует файл')
    }

    return path.join(__dirname, '../', 'uploads', filename)
  }

  async signup ({ link, password }) {
    if (!link) {
      throw ApiError.BadRequest('Некоррректные данные', { link: 'Обязательное поле' })
    }

    if (!password) {
      throw ApiError.BadRequest('Некоррректные данные', { password: 'Обязательное поле' })
    }

    const findedDocument = await DocumentModel.findOne({ link })

    if (!findedDocument) {
      throw ApiError.BadRequest('Документ с такой ссылкой отсутствует')
    }

    await DocumentAuthModule.create({
      documentId: findedDocument._id,
      password
    })
  }
  
  async verify ({ link, verifyAuthor, verifyAddresse }) {
    if (!link) {
      throw ApiError.BadRequest('Некоррректные данные', { link: 'Обязательное поле' })
    }

    if (!verifyAuthor) {
      throw ApiError.BadRequest('Некоррректные данные', { verifyAuthor: 'Обязательное поле' })
    }

    if (!verifyAddresse) {
      throw ApiError.BadRequest('Некоррректные данные', { verifyAddresse: 'Обязательное поле' })
    }

    const findedDocument = await DocumentModel.findOne({ link })

    if (!findedDocument) {
      throw ApiError.BadRequest('Документ с такой ссылкой отсутствует')
    }

    const findedAuth = await DocumentAuthModule.findOne({ documentId: findedDocument._id })
    
    if (!findedAuth) {
      throw ApiError.BadRequest('Документ не зарегистрирован')
    }

    await DocumentVerifyModel.create({
      documentId: findedDocument._id,
      verifyAuthor,
      verifyAddresse
    })

    return this.generateTokens({ id: findedDocument._id, link })
  }

  async get ({ link }) {
    const document = await DocumentModel.findOne({ link })

    if (!document) {
      return null
    }

    if (!document._doc.activeAt || (Date.now() >= document._doc.activeAt)) {
      return { ...document._doc, activate: false }
    }
    
    return { ...document._doc, activate: true }
  }

  async activate ({ link }, { tarif }) {
    const date = new Date()
    const document = await DocumentModel.findOneAndUpdate({ link }, {
      activeAt: date.setMonth(date.getMonth() + 3),
      tarif
    }, { returnOriginal: false })

    return { ...document._doc, activate: true }
  }

  async delete ({ id, link }) {
    await DocumentModel.deleteOne({ link })
    await DocumentAuthModule.deleteOne({ documentId: id })
    await DocumentVerifyModel.deleteOne({ documentId: id })
  }

  generateTokens (payload) {
    return jwt.sign(payload, 'jwt-access-secret', { expiresIn: `15552000s` })
  }

  validateToken (token) {
    try {
      return jwt.verify(token, 'jwt-access-secret')
    } catch (error) {
      throw ApiError.UnauthorizedError()
    }
  }

  async update ({ link }, file) {
    const document = await DocumentModel.findOneAndUpdate({ link }, {
      fileName: file.filename,
      title: iconv.decode(file.originalname, 'utf-8'),
      createdAt: Date.now()
    }, { returnOriginal: false })

    return {
      token: this.generateTokens({ id: document._id, link: document.link }),
      ...document
    }
  }

  async signin ({ link, password }) {
    const document = await DocumentModel.findOne({ link })

    if (!document) {
      throw ApiError.BadRequest('Текущий линк не существует')
    }

    const verify = await DocumentAuthModule.findOne({ documentId: document._id })

    if (!verify) {
      throw ApiError.BadRequest('Текущий линк не существует')
    }

    if (verify.password !== password) {
      throw ApiError.BadRequest('Неправильный пароль')
    }

    return {
      token: this.generateTokens({ id: document._id, link: document.link }),
      ...document
    }
  }

  async form (payload) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'inforsphere@mail.ru',
        pass: 'uAE81ZQerL6kui7DZRsX'
      }
    })

    await transporter.sendMail({
      from: 'inforsphere@mail.ru',
      to: 'renat.gainiev@gmail.com',
      subject: payload.type,
      html: `
        <div>Link: ${payload.link}</div>
        <div>Email: ${payload.email}</div>
        <div>Comment: ${payload.comment}</div>
      `
    })

    await FormModel.create(payload)
  }

  async getCount () {
    const count = await DocumentModel.countDocuments()

    return count
  }

  async excel () {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'inforsphere@mail.ru',
        pass: 'uAE81ZQerL6kui7DZRsX'
      }
    })

    const documents = await DocumentModel.find()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Documents')

    worksheet.addRow(['Линк', 'Активен до', 'Выбранный тариф', 'Пароль', '5 букв автора', '5 букв адресата'])

    const docs = []

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      const { password } = await DocumentAuthModule.findOne({documentId: doc._id})
      const { verifyAuthor, verifyAddresse } = await DocumentVerifyModel.findOne({documentId: doc._id})
      docs.push({
        link: doc.link,
        activeAt: doc.activeAt,
        tarif: doc.tarif,
        password,
        verifyAuthor,
        verifyAddresse
      })
    }

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]
      const dateObject = new Date(doc.activeAt);

      const year = dateObject.getFullYear();
      const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObject.getDate()).slice(-2);

      const hours = ("0" + dateObject.getHours()).slice(-2);
      const minutes = ("0" + dateObject.getMinutes()).slice(-2);

      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  
      worksheet.addRow([
        doc.link,
        doc.activeAt || (Date.now() < doc.activeAt) ? formattedDate : 'Не активен',
        doc.tarif === 'year' ? 'Годовой тариф' : doc.tarif === 'month' ? 'Месячный тариф' : '',
        doc.password,
        doc.verifyAuthor,
        doc.verifyAddresse
      ])
    }

    worksheet.columns.forEach(column => {
      let maxColumnWidth = 0;
      column.eachCell({ includeEmpty: true }, cell => {
        const cellWidth = cell.value ? cell.value.toString().length : 0;
        maxColumnWidth = Math.max(maxColumnWidth, cellWidth);
      });
      column.width = maxColumnWidth + 2;
    });
  
    worksheet.getRow(1).font = { bold: true };

    await transporter.sendMail({
      from: 'inforsphere@mail.ru',
      to: 'renat.gainiev@gmail.com',
      subject: 'Отчет в виде Excel файла',
      attachments: [
        {
          filename: 'report.xlsx',
          content: await workbook.xlsx.writeBuffer()
        },
      ]
    })
  }
}

module.exports = new DocumentService