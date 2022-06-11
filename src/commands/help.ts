import { CommandConstructor, Client } from "../addons/types";
import { CommandInteraction, Interaction, Message } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders'

const data: CommandConstructor = {
    name: "help",
    description: "Shows all commands",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all commands")
    ,
    interaction: (client: Client, interaction: CommandInteraction) => {
        //
    },
    message: (client: Client, message: Message, args: string[]) => {
        //
    },
    nonCmdInteraction: (client: Client, interaction: Interaction) => {
        //
    },
}

export const command = data;