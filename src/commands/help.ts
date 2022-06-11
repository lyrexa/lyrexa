import { Client, CommandConstructor, AHD_META_DATA } from "../addons/types";
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
        .addStringOption(opt =>
            opt.setName('command')
                .setDescription('The command to get more info')
                .setRequired(false)
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
        const command = interaction.options.getString('command');

        if (category && command) {
            interaction.reply({ content: 'You can only view a command or a category at once', ephemeral: true });
            return;
        }

        if (command) {
            // Command code
            const command_: CommandConstructor = client.commands.find(cmd => cmd.name == command.toLowerCase());
            if (!command_) {
                interaction.reply({ content: 'Error | Failed to find command ' + command, ephemeral: true });
                return;
            }

            const advanced = command_.help.advanced;

            const embed = new MessageEmbed()
                .setTitle(`${client.user?.username} Help - ${capitalizeFirstLetter(command_.name)}`)
                .setDescription("Here is all the information I can find about the " + command_.name + " command.\n[] optional, {} required")
            //

            if (!advanced) {
                embed.addField('Category', command_.help.category, true);

                interaction.reply({ content: 'Warn | This command does not have an cmd.help.advanced property', embeds: [embed], ephemeral: true });

                return;
            }

            const fields: FVersion[] = [];

            fields.push({ name: 'Usage [Slash]', value: generateUsage(advanced.usage.slash, command_.name), inline: true });

            fields.push({ name: 'Usage [Slash]', value: generateUsage(advanced.usage.message, command_.name), inline: true });

            if (advanced.parameters) fields.push({ name: 'Parameters', value: solveParameters(advanced.parameters), inline: true });

            fields.push({ name: 'Category', value: command_.help.category, inline: true });

            if (advanced.commandDetails) fields.push({ name: 'Command Details', value: convertCommandDetails(advanced.commandDetails), inline: true });

            if (advanced.codeDetails) fields.push({ name: 'Code Details', value: convertCodeDetails(advanced.codeDetails, client), inline: true });

            embed.setFields(fields);

            interaction.reply({ embeds: [embed], ephemeral: true });

            return;
        }

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

function convertCommandDetails(details: AHD_META_DATA._AHD_CommandDetails): string {
    let result = '';

    if (details.level == 'Top') {
        result += 'Top Level Command\n';
    }

    if (details.level == 'Sub') {
        result += 'Sub Command\n';
    }

    result += `Options: ${details.optionsCount}`;

    return result;
}

function convertCodeDetails(details: AHD_META_DATA._AHD_CodeDetails, client: Client): string {
    let result = '';

    if (details.lines) result += `Lines: ${details.lines}\n`;

    result += `Contributors: ${details.contributors.count}\n`;

    const people = details.contributors.people;

    let out: PSN[] = [];

    people.forEach(async person => {
        let obj: PSN = {
            ping: `<@!${person.id}>`,
            tag: 'null'
        }
        const d = client.users.cache.get(person.id) || await client.users.fetch(person.id).catch(console.log);

        if (d) obj.tag = d.tag;
        else obj.tag = person.data.name + '#' + person.data.discriminator + '?'

        out.push(obj);
    })

    out.forEach(async person => {
        let string = `- ${person.ping} | ${person.tag}`;

        if (out.indexOf(person) == out.length - 1) string += '\n';

        result += string;
    })

    return result;
}

function generateUsage(inp: AHD_META_DATA._AHD_UsageItem[], cmdName: string): string {
    let string = '';

    inp.forEach(item => {
        let str = `/${cmdName}`;

        if (item.options) {
            item.options.forEach(option => {
                if (option.required) str += ` {${option.name}}`;
                else str += ` [${option.name}]`;
            })
        }

        string += `${str}\n`;
    })

    return string;
}

function solveParameters(parameters: AHD_META_DATA._AHD_Parameter[]): string {
    let string = '';

    parameters.forEach(parameter => {
        string += `${parameter.name}: ${parameter.description}\n`;
    })

    return string;
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

interface PSN {
    ping: string;
    tag: string;
}