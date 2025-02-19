const environments = require('./config/environments')
const authenticateUser = require('./config/authenticate')
const client = require('./config/connectTelegram')
const { NewMessage } = require('telegram/events')

const modules = async () => {
    if (!environments.STRING_SESSION) {
        await authenticateUser()
    } else {
        require('./utils/profileUpdater')

        if (environments.DELETE === "true") {
          client.addEventHandler(async (event) => {
            const msgId = event._messageId;
  
            await client.deleteMessages(undefined, [msgId], { revoke: true });
          
          }, new NewMessage({ incoming: true, outgoing: true }));
        }
    }
}

modules()