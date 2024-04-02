const { Api } = require('telegram')
const { CustomFile } = require("telegram/client/uploads")
const client = require('../config/connectTelegram')

const logger = require('../helpers/logger')
const fs = require('fs')

const updateProfilePhoto = async (filName, filePath) => {
    try {
        const info = await client.invoke( new Api.photos.GetUserPhotos({ userId: 'me', limit: 1 }) )
        const oldPhoto = info.photos

        await client.invoke(
            new Api.photos.UploadProfilePhoto({
                file: await client.uploadFile({
                    file: new CustomFile(
                        filName,
                        fs.statSync(filePath).size,
                        filePath
                    ),
                    workers: 1,
                })
            })
        )

        if (oldPhoto) {
            await client.invoke(
                new Api.photos.DeletePhotos({ id: oldPhoto })
            )
        }
    } catch (error) {
        console.log(error)
        logger(error)
    }
}

module.exports = updateProfilePhoto