import { SlashCommandBuilder } from '@discordjs/builders'
import { Interaction, Message } from 'discord.js';
import { Client } from '../types';

export interface CommandConstructor {
    name: string;
    description: string;
    data: SlashCommandBuilder;
    interaction(client: Client, interaction: Interaction): void;
    message(client: Client, message: Message, args: string[]): void;
    nonCmdInteraction(client: Client, interaction: Interaction): void;
}