const path = require('path')
const fs = require('fs')
const logger = require('../helpers/logger')

const imageGenerator = async (time) => {
    try {
        const URL = `https://yuldoshevuz.sirv.com/Images/watch.jpg?w=750&h=750&text=${time}&text.size=100&text.color=a1d200ff&text.align=center&text.position.gravity=center&text.font.family=Sarpanch&text.font.size=60&text.rotate=-32&text.position.y=-30&text.position.x=-30`
        const API = await fetch(URL)
        const response = await API.arrayBuffer()

        const imageFolder = path.join(process.cwd(), 'image')
        const filePath = path.join(imageFolder, 'photo.jpg')

        if (!fs.existsSync(imageFolder)) {
            fs.mkdirSync(imageFolder)
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        fs.writeFileSync(filePath, Buffer.from(response))
        return { fileName: 'photo.jpg', filePath }
    } catch (error) {
        console.log(error)
        logger(error)
    }
}

module.exports = imageGenerator