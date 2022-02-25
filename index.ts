// Made with ❤️ by Devin

import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import fs from 'fs'
import path from 'path'
const yml = require('js-yaml')

const Client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

const token = yml.load(fs.readFileSync('config/token.yml'))
const config = yml.load(fs.readFileSync('config/config.yml'))

Client.on('ready', () => {

    new WOKCommands(Client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: [config.server.id],
        botOwners: [config.server.owner]
    })

    console.log('\x1b[32m%s\x1b[m', '[Bunny Bot] :: Bot is online')
    console.log('\x1b[32m%s\x1b[m', '[Bunny Bot] :: Made by Conway#1234')
})

Client.login(token.TOKEN)