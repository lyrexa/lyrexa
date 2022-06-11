import { ButtonInteraction, CommandInteraction, ContextMenuInteraction, Interaction, ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";
import { Client } from "../addons/types";

export function event(client: Client, interaction: Interaction): void {
    // HANDLE INTERACTION

    if (interaction.isCommand()) commandInteraction(client, interaction);

    if (interaction.isSelectMenu()) selectMenuInteraction(client, interaction);
    if (interaction.isButton()) buttonInteraction(client, interaction);
    if (interaction.isContextMenu()) contextMenuInteraction(client, interaction);
    if (interaction.isModalSubmit()) modalSubmitInteraction(client, interaction);
}

function commandInteraction(client: Client, interaction: CommandInteraction): void {
    // HANDLE COMMAND INTERACTION

    const command = client.commands.get(interaction.commandName);
    if (command) { command.interaction(client, interaction); return; }

    // HANDLE NON-FOUND COMMAND
    interaction.reply({ content: 'An Error Occured, (Failed to find command)', ephemeral: true });
}

function selectMenuInteraction(client: Client, interaction: SelectMenuInteraction): void {
    // HANDLE SELECT MENU INTERACTION

    const cmd_caller = interaction.customId.split('_')[0];
    const command = client.commands.get(cmd_caller);
    if (command) { command.nonCmdInteraction(client, interaction); return; }

    // HANDLE NON-FOUND COMMAND

    // code for if there is a select menu where the code is not from a command.
}

function buttonInteraction(client: Client, interaction: ButtonInteraction): void {
    // HANDLE BUTTON INTERACTION

    const cmd_caller = interaction.customId.split('_')[0];
    const command = client.commands.get(cmd_caller);
    if (command) { command.nonCmdInteraction(client, interaction); return; }

    // HANDLE NON-FOUND COMMAND

    // code for if there is a button where the code is not from a command.
}

function contextMenuInteraction(client: Client, interaction: ContextMenuInteraction): void {
    // This code is not ready, nor used.
}

function modalSubmitInteraction(client: Client, interaction: ModalSubmitInteraction): void {
    // This code is not ready, nor used.
}