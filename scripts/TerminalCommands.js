class CommandHandler {

    static commands = {};

    registerCommand(command) {
        this.commands[command.name] = command;
    }

    executeCommand(command, args) {
        if (this.commands[command]) {
            try {
                this.commands[command].execute(args);
            } catch (e) {
                console.error("Error executing command:", e, command, args);
            }
        } else {
            console.log("Command not found:", command);
        }
    }
}


class TerminalCommand {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    execute(args) {
        console.log("Not implemented:", args);
    }
}

class HelpCommand extends TerminalCommand {
    constructor() {
        super("help", "Display this message");
    }

    execute(args) {
        if (args.length > 0) {
            if (CommandHandler.commands[args[0]])
                console.log(CommandHandler.commands[args[0]].description);
            else
                console.log("Command not found:", args[0]);
            
            return;
        }

        console.log("Available commands:");
        for (const command in CommandHandler.commands)
            console.log(command, "-", CommandHandler.commands[command].description);

    }
}