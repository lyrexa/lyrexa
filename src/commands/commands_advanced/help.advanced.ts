import { AdvancedHelpData } from "../../addons/types"

export const advanced: AdvancedHelpData = {
    enabled: true,
    usage: {
        slash: [
            { options: [{ name: 'category', required: false }] },
            { options: [{ name: 'command', required: false }] },
            { options: [] }
        ],
        message: [
            { options: [{ name: 'category', required: false }] },
            { options: [{ name: 'command', required: false }] },
            { options: [] }
        ]
    },
    parameters: [
        { name: 'Category', description: 'The category of commands' },
        { name: 'Command', description: 'The command to get more info' }
    ],
    commandDetails: {
        level: 'Top',
        optionsCount: 2
    },
    codeDetails: {
        contributors: {
            count: 1,
            people: [
                { data: { name: 'Diamond Oreo', discriminator: '0001' }, id: '632541244035301376' }
            ]
        },
        lines: 307
    }

}