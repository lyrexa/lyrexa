import { Client } from 'discord.js';
import { token } from './config/base_config';

const client = new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});

// register events and commands (*todo)


// Log the client in
client.login(token);