import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, Interaction, Message } from 'discord.js';
import { Client, HelpMenuData } from '../types';

export interface CommandConstructor {
    name: string;
    description: string;
    data: SlashCommandBuilder | any;
    help: HelpMenuData;
    interaction(client: Client, interaction: CommandInteraction): void;
    message(client: Client, message: Message, args: string[]): void;
    nonCmdInteraction(client: Client, interaction: Interaction): void;
}