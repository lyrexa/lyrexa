//import { Client, Collection } from 'discord.js';
import { Client } from './addons/classes/ModdedClient';
import { token } from './config/base_config';
import { readdirSync } from 'fs';

const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});

// register events and commands (*todo)
let slashCommands = [];

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`).command;
    client.commands.set(command.name, command);
    let slash = command.data ? command.data : null;
    if (slash) slashCommands.push(slash);
}

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`).event;
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
}

// Log the client in
client.login(token);