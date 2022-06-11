import { CommandConstructor as commandconstructor } from "./interfaces/CommandConstructor";
import { Client as client } from "./classes/ModdedClient";
import { ClientOptions as clientoptions } from "./interfaces/ClientOptions";

export type CommandConstructor = commandconstructor;
export type Client = client;
export type ClientOptions = clientoptions;