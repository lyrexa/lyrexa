import { AdvancedHelpData } from "./advancedHelpData";

export type HelpMenus = "info" | "mod" | "fun" | "eco" | "other";
export type DevHMenus = "dev" | "support" | "admin";
export type DevLevels = 1 | 2 | 3 | 4 | 5;

export interface HelpData {
    show: boolean;
    category: HelpMenus;
    showDev?: boolean;
    dev?: DevHelpData;
    advanced?: AdvancedHelpData;
}

export interface DevHelpData {
    show: boolean;
    category: DevHMenus;
    level?: DevLevels;
}

/*
DevHelpData - Level
1 - Shows up for anyone on the staff
2 - Shows only for support staff+
3 - Shows only for botadmins
4 - Shows only for BTMC Team members
5 - Shows only for Developers
*/