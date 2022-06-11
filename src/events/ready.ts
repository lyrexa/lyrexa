import { Client } from '../addons/classes/ModdedClient';

export function event(client: Client) {
    console.log(`${client.user?.tag} is online!`);
}