export interface TerminalInput {

    user: string;
    directory: string;

    content: string;
    value: string;
    
    enabled: boolean;

    focus(): void;    
}
