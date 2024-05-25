class CommandHandler {


    constructor(print) {
        this.print = print;

        this.registerCommand(new HelpCommand(print));
    }

    registerCommand(command) {
        this.commands[command.name] = command;
    }

    executeCommand(command, args) {
        if (this.commands[command]) {
            try {
                this.commands[command].execute(args);
            } catch (e) {
                this.print("Error executing command:", e, command, args);
            }
        } else {
            this.print("Command not found:", command);
        }
    }
}

class TerminalCommand {

    description = "No description";
    name = "Undefined";

    constructor (handler) { this.handler = handler; }

    print(...args) {
        this.handler.print(...args);
    }

    execute(args) {
        console.log("Not implemented:", args);
    }

    toString() {
        return this.name + " - " + this.description;
    }
}

class HelpCommand extends TerminalCommand {

    description = "Display this message";
    name = "help";

    execute(args) {
        if (args.length > 0) {
            if (this.handler.commands[args[0]])
                this.print(this.handler.commands[args[0]].description);
            else
                this.print("Command not found:", args[0]);
            
            return;
        }

        this.print("Samuel Walls, version 0.0.1-prerelease (2024-5-24)\nType `help' to see this list.\nType `help name' to find out more about the function `name'.\n\nAvailable commands:");

        for (const command in this.handler.commands)
            this.print(command, "\t", this.handler.commands[command].description);
    }
}