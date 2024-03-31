require('dotenv').config()
const env = process.env

const { Api, TelegramClient } = require("telegram")
const { StringSession } = require("telegram/sessions")

const moment = require('moment')
const { CronJob } = require('cron')

const session = new StringSession(env.STRING_SESSION); // You should put your string session here
const client = new TelegramClient(session, env.API_ID, env.API_HASH)

client.connect().then(() => {
    console.log('Telegram connected successfully')
}).catch(err => {
    console.log('Xato!', err.message)
})

const updateProfile = new CronJob('* * * * *', async () => {
    try {
        const time = moment(new Date()).format('HH:mm')

        await client.invoke(
            new Api.account.UpdateProfile({ firstName: `Muhammadali | ⌚️ ${time}` })
        )
        await client.invoke(
            new Api.account.UpdateStatus({ offline: false })
        )
    } catch (error) {
        console.log(error)
    }
}, null, true, 'Asia/Tashkent')
