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
const embeds = yml.load(fs.readFileSync('config/embeds.yml'))

Client.on('ready', () => {

    new WOKCommands(Client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: [config.server.id],
        botOwners: [config.server.owner]
    })

    console.log('\x1b[32m%s\x1b[m', '[Bunny Bot] :: Bot is online')
    console.log('\x1b[32m%s\x1b[m', '[Bunny Bot] :: Made by Conway#1234')
});

Client.on('guildMemberAdd', (member) => {

    if (config.welcome.embed) {

        const embedconfig = embeds.welcome
        const wChannel = member.guild.channels.cache.get(config.welcome.channel)

        let description = embeds.welcome.description
        let BDescription = description
            .replace('{member.user}', `${member}`)  
            .replace('{member.username}', `${member.user.username}`)
            .replace('{member.hashtag}', `${member.user.discriminator}`)
            .replace('{server}', `${member.guild.name}`)
            .replace('{member.count}', `${member.guild.memberCount}`)
            .replace('{joined}', `<t:${Math.floor(Date.parse(new Date().toString()) / 1000)}:R>`)

        function embedThumb() {
            if (embedconfig.image === 'avatar') {
                let avatar = member.user.displayAvatarURL({ format: 'png' })
                return avatar
            } else if (embedconfig.image === 'server') {
                let guild = member.guild
                let image = ''

                if (guild.icon) {
                    image = `${guild.iconURL({ format: 'png' })}`
                    return image
                } else {
                    image = `${embedconfig.imageURL}`
                    return image
                }
            }
        }

        const wEmbed = {
            author: {
                name: `${member.user.username}#${member.user.discriminator} joined!`,
                icon_url: `${member.user.displayAvatarURL({ format: 'png' })}`
            },
            description: `${BDescription}`,
            footer: {
                text: `${embedconfig.footer}`
            },
            thumbnail: { url: `${embedThumb()}` },
            timestamp: new Date()
        }

        if (wChannel?.type === 'GUILD_TEXT') wChannel.type === 'GUILD_TEXT'
        else {

            console.log('\x1b[31m%s\x1b[m', '[Bunny Bot] :: Welcome channel must be a text channel')
            return
        }

        wChannel.send({
            content: `Welcome to the server ${member}`,
            embeds: [wEmbed]
        });

    } else {

        const wChannel = member.guild.channels.cache.get(config.welcome.channel)
        
        if (wChannel?.type === 'GUILD_TEXT') wChannel.type === 'GUILD_TEXT'
        else {

            console.log('\x1b[31m%s\x1b[m', '[Bunny Bot] :: Welcome channel must be a text channel')
            return

        }

        const messageContent = config.welcome.message

        wChannel.send({
            content: `${messageContent}`
        })

    }

})

Client.on('guildMemberRemove', (member) => {

    if (config.left.embed) {

        const embedconfig = embeds.left
        const lChannel = member.guild.channels.cache.get(config.left.channel)

        let description = embeds.left.description
        let BDescription = description
            .replace('{member.user}', `${member}`)  
            .replace('{member.username}', `${member.user.username}`)
            .replace('{member.hashtag}', `${member.user.discriminator}`)
            .replace('{member.count}', `${member.guild.memberCount}`)
            .replace('{joined}', `<t:${Math.floor(Date.parse(new Date().toString()) / 1000)}:R>`)

        function embedThumb() {
            if (embedconfig.image === 'avatar') {
                let avatar = member.user.displayAvatarURL({ format: 'png' })
                return avatar
            } else if (embedconfig.image === 'server') {
                let guild = member.guild
                let image = ''

                if (guild.icon) {
                    image = `${guild.iconURL({ format: 'png' })}`
                    return image
                } else {
                    image = `${embedconfig.imageURL}`
                    return image
                }
            }
        }

        const lEmbed = {
            author: {
                name: `${member.user.username}#${member.user.discriminator} left!`,
                icon_url: `${member.user.displayAvatarURL({ format: 'png' })}`
            },
            description: `${BDescription}`,
            footer: {
                text: `${embedconfig.footer}`
            },
            thumbnail: { url: `${embedThumb()}` },
            timestamp: new Date()
        }

        if (lChannel?.type === 'GUILD_TEXT') lChannel.type === 'GUILD_TEXT'
        else {

            console.log('\x1b[31m%s\x1b[m', '[Bunny Bot] :: "left" channel must be a text channel')
            return
        }

        lChannel.send({
            content: `${member} has left the server!`,
            embeds: [lEmbed]
        });

    } else {

        const lChannel = member.guild.channels.cache.get(config.left.channel)
        
        if (lChannel?.type === 'GUILD_TEXT') lChannel.type === 'GUILD_TEXT'
        else {

            console.log('\x1b[31m%s\x1b[m', '[Bunny Bot] :: "left" channel must be a text channel')
            return

        }

        const messageContent = config.left.message

        lChannel.send({
            content: `${messageContent}`
        })

    }

})

Client.login(token.TOKEN)