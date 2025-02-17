const { TelegramClient, sessions } = require('telegram')
const { StringSession } = sessions

const input = require('input')
const path = require('path')
const fs = require('fs')
const logger = require('../helpers/logger')

const authenticateUser = async () => {
    const apiId = 20118476
    const apiHash = 'c2f5c17ee02b50760c04e364ecd9a390'
    const stringSession = new StringSession('')

    try {
        const client = new TelegramClient(stringSession, apiId, apiHash)

        await client.start({
            phoneNumber: async () => await input.text('Telefon raqamingizni xalqaro formatda kiriting:\nMasalan: +998991112233'),
            phoneCode: async () => await input.text('Juda soz! Endi esa telegramingizga kelgan kodni kiriting:'),
            password: async () => await input.text('Hisobingiz himoyalangan. Ikki bosqichli parolni kiriting:'),
            onError: (err) => console.log(err)
        })
        const nikName = await input.text("Telegram nikname'ingizni kiriting:")
        const username = await input.text("Telegram username kiriting:")
        const session = client.session.save()
        const environmentsFile = `API_ID=${apiId}\nAPI_HASH=${apiHash}\nSTRING_SESSION=${session}\nNIKNAME=${nikName}\nTG_USERNAME=${username}`
        
        await client.sendMessage('me', {
            message: `Ushbu kodni o'chirib yubormang!\n\n**STRING_SESSION:** \`${session}\``,
            parseMode: 'markdown'
        })

        fs.writeFileSync(path.join(process.cwd(), '.env'), environmentsFile)
        console.log('Muvaffaqiyatli ulandingiz!')
    } catch (error) {
        logger(error)
        console.log('Qandaydir xatolik yuz berdi. Batafsil:', error)
    }
}

module.exports = authenticateUser
