import { CommandConstructor as commandconstructor, HelpData, DevHelpData } from "./interfaces/CommandConstructor";
import { Client as client } from "./classes/ModdedClient";
import { ClientOptions as clientoptions } from "./interfaces/ClientOptions";

export type CommandConstructor = commandconstructor;
export type Client = client;
export type ClientOptions = clientoptions;
export type HelpMenuData = HelpData;
export type DevHMenuData = DevHelpData;