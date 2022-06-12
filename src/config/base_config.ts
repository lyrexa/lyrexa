import { token as tkn } from './token';
import { ConfigurationData } from "../addons/interfaces/configurationData";

export const Config: ConfigurationData = {
    events: [
        { name: 'with data', type: 'PLAYING', duration: 10 },
        { name: 'you, always', type: 'WATCHING', duration: 10 },
    ],
    enableEvents: true,
}

export const events = Config.events;
export const enableEvents = Config.enableEvents;

export const token = tkn;