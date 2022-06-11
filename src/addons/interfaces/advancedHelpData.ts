export interface AdvancedHelpData {
    enabled: boolean;
    usage: AHD_Usage;
    parameters: AHD_Parameter[];
    commandDetails?: AHD_CommandDetails;
    codeDetails?: AHD_CodeDetails;
}

export interface AHD_Usage {
    slash: AHD_UsageItem[];
    message: AHD_UsageItem[];
}

interface AHD_UsageItem {
    options?: AHD_UsageItemOption[];
}

interface AHD_UsageItemOption {
    name: string;
    required: boolean;
}

interface AHD_CommandDetails {
    level: 'Top' | 'Sub' | "Top" | "Sub"; // TOP LEVEL COMMAND | SUB COMMAND
    optionsCount: number;
}

interface AHD_CodeDetails {
    lines?: number;
    contributors: AHD_Contributors;
}

interface AHD_Contributors {
    count: number;
    people: AHD_Contributor[];
}

interface AHD_Contributor {
    data: AHD_Person;
    id: string;
}

interface AHD_Person {
    name: string;
    discriminator: string;
}

interface AHD_Parameter {
    name: string;
    description: string;
}

type meta = { AHD_UsageItem: AHD_UsageItem; AHD_UsageItemOption: AHD_UsageItemOption; AHD_CommandDetails: AHD_CommandDetails; AHD_CodeDetails: AHD_CodeDetails; AHD_Contributors: AHD_Contributors; AHD_Contributor: AHD_Contributor; AHD_Person: AHD_Person, AHD_Parameter: AHD_Parameter };
export { meta };