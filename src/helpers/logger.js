const path = require('path')
const fs = require('fs')
const moment = require('moment')

function logger(error) {
    const errorMessage = (error && error.stack) ? error.stack : JSON.stringify(error)
    const errorTime = moment(new Date()).format('MMMM Do YYYY, HH:mm:ss')

    fs.appendFileSync(path.join(process.cwd(), 'error.log'), `${errorTime} ` + errorMessage + '\n', (err) => {
        if (err) {
            fs.writeFileSync(path.join(process.cwd(), 'error.log'), errorMessage + '\n', (err) => {
                if (err) {
                    console.error('Xatolik! error.log faylini yaratib bo\'lmadi:', err)
                } else {
                    console.log('error.log fayli muvaffaqiyatli yaratildi')
                }
            })
        }
    })
}

module.exports = logger