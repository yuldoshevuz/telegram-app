const path = require('path')
const fs = require('fs')


function logger(error) {
    // Xatolikni qabul qilish
    const errorMessage = (error && error.stack) ? error.stack : JSON.stringify(error)

    // Xatolik ma'lumotini log fayliga yozish
    fs.appendFileSync(path.join(__dirname, '../', '../error.log'), errorMessage + '\n', (err) => {
        if (err) {
            // Faylni yaratish
            fs.writeFileSync(path.join(__dirname, '../', '../error.log'), errorMessage + '\n', (err) => {
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