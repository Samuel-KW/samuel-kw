/**
 * A class for managing the command history
 * @example
 * const terminalHistory = new History();
 * 
 * terminalHistory.addCommand('ls');
 * terminalHistory.addCommand('cd /');
 * terminalHistory.addCommand('pwd');
 * 
 * console.log(terminalHistory.getPreviousCommand()); // Output: "pwd"
 * console.log(terminalHistory.getPreviousCommand()); // Output: "cd /"
 * console.log(terminalHistory.getNextCommand());     // Output: "pwd"
 * console.log(terminalHistory.getNextCommand());     // Output: null (no further history)
 * 
 * terminalHistory.resetHistory();
 * console.log(terminalHistory.getHistoryState());    // Output: []
 */
export default class History {
    private history: string[] = [];
    private currentIndex: number = -1;
    private currentInput: string = "";

    private maxHistoryLength: number = 10;

    constructor() {}

    // Adds a command to the history
    addCommand(command: string): void {

        if (this.history.length >= this.maxHistoryLength)
            this.history.shift();

        command = command.trim();

        if (command) {
            this.history.push(command);
            this.currentIndex = this.history.length;
            this.currentInput = "";
        }
    }

    // Handles the 'up arrow' key press, returning the previous command
    getPreviousCommand(): string | null {
        if (this.history.length === 0 || this.currentIndex <= 0)
            return null;
        
        if (this.currentIndex === this.history.length)
            this.currentInput = "";
        
        this.currentIndex--;
        return this.history[this.currentIndex];
    }

    // Handles the 'down arrow' key press, returning the next command
    getNextCommand(): string | null {
        if (this.history.length === 0 || this.currentIndex >= this.history.length - 1)
            return null;
        
        this.currentIndex++;
        if (this.currentIndex === this.history.length)
            return this.currentInput;
        
        return this.history[this.currentIndex];
    }

    // Resets the command history to the initial state
    resetHistory(): void {
        this.history = [];
        this.currentIndex = -1;
        this.currentInput = "";
    }

    // Returns the current state of the history
    getHistoryState(): string[] {
        return [...this.history];
    }
}
