import { CommandInteraction, Interaction } from "discord.js";
import { Client } from "../addons/types";

export function event(client: Client, interaction: Interaction): void {
    // HANDLE INTERACTION

    if (interaction.isCommand()) commandInteraction(client, interaction);
}

function commandInteraction(client: Client, interaction: CommandInteraction): void {
    // HANDLE COMMAND INTERACTION

    const command = client.commands.get(interaction.commandName);
    if (command) { command.interaction(client, interaction); return; }

    // HANDLE NON-FOUND COMMAND
    interaction.reply({ content: 'An Error Occured, (Failed to find command)', ephemeral: true });
}