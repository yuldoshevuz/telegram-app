const { Api } = require("telegram")
const moment = require('moment')
const { CronJob } = require('cron')
const client = require('../config/connectTelegram')
const { NIKNAME } = require('../config/environments')

const logger = require('../utils/logger')

const job = new CronJob('* * * * *', async () => {
    try {
        const time = moment(new Date()).format('HH:mm')

        await client.invoke(
            new Api.account.UpdateProfile({ firstName: `${NIKNAME} | ⌚️ ${time}` })
        )
        await client.invoke(
            new Api.account.UpdateStatus({ offline: false })
        )
    } catch (error) {
        logger(error)
        console.log(error)
    }
}, null, true, 'Asia/Tashkent')