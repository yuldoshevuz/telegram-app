const environments = require('./config/environments')
const authenticateUser = require('./config/authenticate')

const modules = async () => {
    if (!environments.STRING_SESSION) {
        await authenticateUser()
    } else {
        require('./utils/profileUpdater')
    }
}

modules()