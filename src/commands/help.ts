import { Client, CommandConstructor, HelpMenus } from "../addons/types";
import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js";
import { advanced as advancedHelpData } from "./commands_advanced/help.advanced";

const data: CommandConstructor = {
    name: "help",
    description: "Shows all commands",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all commands")
        .addStringOption(opt =>
            opt.setName('category')
                .setDescription('The category to show')
                .setRequired(false)
                .addChoices(
                    { name: 'Information', value: 'info' },
                    { name: 'Moderation', value: 'mod' },
                    { name: 'Fun', value: 'fun' },
                    { name: 'Economy', value: 'eco' },
                    { name: 'Other', value: 'other' },
                    { name: 'All Commands', value: 'all' },
                    { name: 'Home', value: 'home' },
                    { name: 'Developer', value: 'dev' }
                )
        )
    ,
    help: {
        show: true,
        category: "info",
        showDev: false,
        advanced: advancedHelpData
    },
    interaction: (client, interaction) => {
        // Get category
        const category = interaction.options.getString('category');

        // Error if dev page
        if (category == 'dev') {
            return interaction.reply({ content: "This page is not available yet." });
        }

        // Get embed
        const embed = showMenuFromSelection(client, category);

        // Get MessageActionRow
        const row = getRow(category);

        // Send embed
        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
    message: (client, message, args) => {
        // Unavailable at this time
    },
    nonCmdInteraction: (client, interaction) => {
        // Is select menu?
        if (interaction.isSelectMenu()) {
            // Get category
            const category = interaction.values[0] || null;

            // Error if dev page
            if (category == 'dev') {
                return interaction.reply({ content: "This page is not available yet.", ephemeral: true });
            }

            // Get embed
            const embed = showMenuFromSelection(client, category);

            // Get MessageActionRow
            const row = getRow(category);

            // Edit message
            interaction.update({ embeds: [embed], components: [row] });

            // Return
            return;
        }
    },
}

export const command = data;

function showMenuFromSelection(client: Client, selection: string | null): MessageEmbed {
    if (!selection || selection == 'home') {
        return new MessageEmbed()
            .setTitle(`${client.user?.username} Help`)
            .setDescription(`This bot is incomplete :)`)
            .addFields(
                { name: 'Help Categories', value: "info, mod, fun, eco, other\nUse /help <cat> to view them" },
            )
    }

    let commands_;

    if (selection == 'all') {
        commands_ = client.commands.filter(command => command.help.show);
    } else {
        commands_ = client.commands.filter(command => command.help.show && command.help.category === selection);
    }

    const commands: command[] = [];

    commands_.forEach(command => {
        const name = command.name;
        const description = command.description;
        commands.push({ name: name, description: description, fieldVersion: { name, value: description, inline: true } });
    });

    const fields: FVersion[] = [];

    commands.forEach(command => {
        fields.push(command.fieldVersion);
    });

    if (commands.length == 0) {
        return new MessageEmbed()
            .setTitle(`${client.user?.username} Help`)
            .setDescription(`No commands found in category ${capitalizeFirstLetter(selection)}`)
    }

    const embed = new MessageEmbed()
        .setTitle(`${client.user?.username} Help`)
        .setDescription(`Commands in category ${capitalizeFirstLetter(selection)}`)
        .addFields(...fields);
    //

    return embed;
}

function getRow(option: string | null): MessageActionRow {
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('help_catselect')
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder(capitalizeFirstLetter(option || 'home'))
                .addOptions([
                    { label: 'Information', value: 'info', description: 'All information commands' },
                    { label: 'Moderation', value: 'mod', description: 'All moderation commands' },
                    { label: 'Fun', value: 'fun', description: 'All fun commands' },
                    { label: 'Economy', value: 'eco', description: 'All economy commands' },
                    { label: 'Other', value: 'other', description: 'All other commands' },
                    { label: 'All Commands', value: 'all', description: 'All commands' },
                    { label: 'Home', value: 'home', description: 'Back to home' },
                    { label: 'Developer', value: 'dev', description: 'Open Dev Portal' }
                ])
        )

    return row;
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface command {
    name: string;
    description: string;
    fieldVersion: FVersion;
}

interface FVersion {
    name: string;
    value: string;
    inline: boolean;
}