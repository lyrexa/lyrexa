import { SlashCommandBuilder } from '@discordjs/builders'

export interface CommandConstructor {
    name: string;
    description: string;
    data: SlashCommandBuilder;
    interaction: Function;
    message: Function;
    nonCmdInteraction: Function;
}