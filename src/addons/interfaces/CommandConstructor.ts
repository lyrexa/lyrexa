import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, Interaction, Message } from 'discord.js';
import { Client } from '../types';

export interface CommandConstructor {
    name: string;
    description: string;
    data: SlashCommandBuilder;
    help: HelpData;
    interaction(client: Client, interaction: CommandInteraction): void;
    message(client: Client, message: Message, args: string[]): void;
    nonCmdInteraction(client: Client, interaction: Interaction): void;
}

export interface HelpData {
    show: boolean;
    category: "info" | "mod" | "fun" | "eco" | "other";
    showDev?: boolean;
    dev?: DevHelpData;
}

export interface DevHelpData {
    show: boolean;
    category: "dev" | "support" | "admin";
    level?: 1 | 2 | 3 | 4 | 5;
}

/*
DevHelpData - Level
1 - Shows up for anyone on the staff
2 - Shows only for support staff+
3 - Shows only for botadmins
4 - Shows only for BTMC Team members
5 - Shows only for Developers
*/