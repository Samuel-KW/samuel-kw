
class Terminal {
    
    constructor(terminalElement) {

        this.commands = {};

        this._parent = terminalElement;
        this._lines = [];

        this.path = "~/index.html";
        this.user = "Guest@Portfolio";
        
        this.enabled = false;
        this.inputElem = this.addLine("", this.path, this.user, true);

        this.init();
    }

    init() {

        this._parent.addEventListener("mouseup", () => {
            if (this.enabled)
                this.inputElem._inputElem.focus();
        });

        this._parent.addEventListener("mousedown", e => {
            if (!this.enabled)
                e.preventDefault();
        });

        this.registerCommand(new HelpCommand(this));
        this.registerCommand(new WhoamiCommand(this));
    }

    get firstLine() {
        return this._lines[this._lines.length - 1];
    }

    registerCommand(command) {
        this.commands[command.name] = command;
    }

    executeCommand(command, args) {
        if (this.commands[command]) {
            // try {
                this.commands[command].execute(args);
            // } catch (e) {
                // this.print("Error executing command:", e, command, args);
            // }
        } else {
            this.print("Command not found:", command);
        }
    }

    handleInput(element) {
        this.inputElem.removeAttribute('active')

        const input = element.value.trim().toLowerCase();
        const [command, ...args] = input.split(" ");
        
        console.log(command, args);
        this.executeCommand(command, args);
        
        this.inputElem = this.addLine("", this.path, this.user, true);
    }

    print(...args) {
        this.addOutputLine(args.join(" "));
    }

    addOutputLine(text) {
        const div = document.createElement("div");
        div.setAttribute("class", "terminal-text");
        div.textContent = text;


        this._parent.appendChild(div);
        this._lines.push(div);
    }
 
    addLine(text, path, user, enabled) {
        const line = document.createElement("terminal-line");
        
        if (text) line.setAttribute("value", text);
        if (path) line.setAttribute("path", path);
        if (user) line.setAttribute("user", user);
        if (enabled) line.setAttribute("active", true);

        this._lines.push(line);
        this._parent.appendChild(line);

        if (this.enabled) line._inputElem.focus();

        const handleInput = e => {

            if (!this.enabled) {
                e.stopPropagation();
                e.preventDefault();

            } else if (e.code === "Enter" || e.key === "Enter") {
                
                e.preventDefault();
                if (!line._inputElem.innerText?.trim())
                    return;               

                this.handleInput(line);
            }
        }

        line._inputElem.addEventListener("keydown", handleInput);
        line._inputElem.addEventListener("oninput", handleInput);

        return line;
    }
}

(() => {

    const terminal = new Terminal(document.querySelector("#content .terminal-body-content"));
    window.terminal = terminal;

    document.addEventListener("DOMContentLoaded", async () => {

        await delay(1000);
        terminal.inputElem.type("whoami");
        await delay(1000);
        terminal.handleInput(terminal.inputElem);
        await delay(3000);
        
        terminal.inputElem.type("help");
        await delay(1000)
        terminal.handleInput(terminal.inputElem);
        terminal.inputElem._inputElem.focus()

        terminal.enabled = true;
    });
})();