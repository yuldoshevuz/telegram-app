const { TelegramClient, sessions } = require('telegram')
const { StringSession } = sessions

const input = require('input')
const path = require('path')
const fs = require('fs')

const authenticateUser = async () => {
    const apiId = 17931361
    const apiHash = '8870742af2c87bdcd90a2aebbc3550a1'
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
        const session = client.session.save()
        const environmentsFile = `API_ID=${apiId}\nAPI_HASH=${apiHash}\nSTRING_SESSION=${session}\nNIKNAME=${nikName}`
        
        await client.sendMessage('me', {
            message: `Ushbu kodni o'chirib yubormang❗️\n\n**STRING_SESSION:** \`${session}\``,
            parseMode: 'markdown'
        })

        fs.writeFileSync(path.join(__dirname, '../', '../', '.env'), environmentsFile)
        console.log('Muvaffaqiyatli ulandingiz!')
    } catch (error) {
        console.log('Qandaydir xatolik yuz berdi. Batafsil:', error)
    }
}

module.exports = authenticateUser