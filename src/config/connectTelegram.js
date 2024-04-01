const { API_ID, API_HASH, STRING_SESSION } = require('./environments')

const { TelegramClient } = require("telegram")
const { StringSession } = require("telegram/sessions")

const session = new StringSession(STRING_SESSION); // You should put your string session here
const client = new TelegramClient(session, +API_ID, API_HASH)

client.connect().then(() => {
    console.log('Successfully connected to telegram')
}).catch(err => {
    console.log('Xato!', err.message)
})

module.exports = client