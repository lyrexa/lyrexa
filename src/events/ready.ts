import { Client } from '../addons/classes/ModdedClient';

export function event(client: Client): void {
    console.log(`${client.user?.tag} is online!`);
}