const { API_ID, API_HASH, STRING_SESSION } = require('./environments')

const { TelegramClient } = require("telegram")
const { StringSession } = require("telegram/sessions");
const logger = require('../utils/logger');

const session = new StringSession(STRING_SESSION); // You should put your string session here
const client = new TelegramClient(session, +API_ID, API_HASH)

client.connect().then(() => {
    console.log('Telegramga muvaffaqiyatli ulandi')
}).catch(err => {
    logger(err)
    console.log('Ulanishda xatolik!', err.message)
})

module.exports = client