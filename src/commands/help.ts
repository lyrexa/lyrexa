import { CommandConstructor } from "../addons/types";
import { SlashCommandBuilder } from '@discordjs/builders'

const data: CommandConstructor = {
    name: "help",
    description: "Shows all commands",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all commands")
    ,
    interaction: (client, interaction) => {
        interaction.reply({ content: 'This command is incomplete', ephemeral: true });
    },
    message: (client, message, args) => {
        //
    },
    nonCmdInteraction: (client, interaction) => {
        //
    },
}

export const command = data;