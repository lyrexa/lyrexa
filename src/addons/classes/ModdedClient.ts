import { Client as BaseClient, Collection } from 'discord.js';
import { ClientOptions } from '../interfaces/ClientOptions';

export class Client extends BaseClient {
    commands: Collection<string, any>;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection();
    }
}