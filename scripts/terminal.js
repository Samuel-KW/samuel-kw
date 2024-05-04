
class Terminal {
    
    constructor(terminalElement) {

        this._parent = terminalElement;
        this._lines = [];

        this.inputElem = this.addLine("", this.path, this.user, true);
        terminalElement.addEventListener("mouseup", e => {
            if (this.enabled)
                this.inputElem._inputElem.focus();
        });

        terminalElement.addEventListener("mousedown", e => {
            if (!this.enabled)
                e.preventDefault();
        });

        this.path = "~/index.html";
        this.user = "Guest@Portfolio";

        this.enabled = false;
    }

    get firstLine() {
        return this._lines[this._lines.length - 1];
    }

    handleInput(element) {
        this.inputElem.removeAttribute('active')

        const input = element.value.trim().toLowerCase();
        const args = input.split(" ");
        
        console.log(args);

        switch (args[0]) {
            case "help":
                this.addOutputLine("Available commands:");
                this.addOutputLine("help - display this message");
                this.addOutputLine("clear - clear the terminal");
                break;

            case "cls":
            case "clear":
                this._lines.forEach(line => line.remove());
                this._lines = [];
                break;

            case "ls":
                this.addOutputLine("index.html");
                this.addOutputLine("about.html");
                this.addOutputLine("projects.html");
                this.addOutputLine("contact.html");
                break;

            case "whoami":
                this.addOutputLine("Samuel Walls");
                break;

            case "echo":
                this.addOutputLine(args.slice(1).join(" "));
                break;

            default:
                this.addOutputLine("Command not found.");
                break;
        }
        
        this.inputElem = this.addLine("", this.path, this.user, true);
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

        line._inputElem.addEventListener("keydown", e => {

            if (!this.enabled) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            if (e.code === "Enter") {
                e.preventDefault();
                this.handleInput(line);
            }
        });

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

        terminal.enabled = true;
    });
})();