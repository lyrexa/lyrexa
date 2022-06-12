import { Client } from '../addons/classes/ModdedClient';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9'
import { token, events, enableEvents } from '../config/base_config';
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

    if (enableEvents && events && events.length > 0) refreshStatus(client, 0);

}

function refreshStatus(client: Client, pos: number): void {
    const status = events?.[pos];

    if (!status) return refreshStatus(client, 0);

    const duration = status.duration;

    setTimeout(refreshStatus, duration * 1000, client, pos + 1);

    client.user?.setActivity(status.name, { type: status.type });

    console.log(`Set status to ${status.type} ${status.name}`);
}