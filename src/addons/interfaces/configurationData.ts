export interface ConfigurationData {
    events?: Event[];
    enableEvents?: boolean;
}

interface Event {
    type: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING';
    name: string;
    duration: number; // in seconds
}