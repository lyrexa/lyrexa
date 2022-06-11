import { Client } from '../addons/classes/ModdedClient';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9'
import { token } from '../config/token';
import { SlashCommandBuilder } from '@discordjs/builders';

export function event(client: Client): void {
    console.log(`${client.user?.tag} is online!`);

    // REGISTER SLASH COMMANDS
    const clientID: string = client.user?.id || '0'; // the || '0' will never be used, its just a typesafe system.
    const guilds = client.guilds.cache.map(g => g.id);
    const rest = new REST({ version: '9' }).setToken(token);

    const unRegistered: SlashCommandBuilder[] = [];

    client.commands.forEach(c => {
        if (c.data) unRegistered.push(c.data);
    });

    (async () => {
        for (const guild of guilds) {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientID, guild),
                    { body: unRegistered }
                )
            } catch (err) {
                console.log(err);
            }
        }
    })()
}