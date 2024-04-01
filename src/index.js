const environments = require('./config/environments')
const authenticateUser = require('./helpers/auth')

async function redirectModule() {
    if (!environments.STRING_SESSION) {
        await authenticateUser()
    } else {
        require('./helpers/profileUpdater')
    }
}

redirectModule()