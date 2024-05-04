class Terminal {
    
    constructor(terminalElement) {

        this._parent = terminalElement;
        this._lines = [];

        this.inputElem = this.addLine("", this.path, this.user, true);
        console.log(terminalElement);
        terminalElement.addEventListener("click", () => this.inputElem._inputElem.focus());

        this.path = "~/index.html";
        this.user = "Guest@Portfolio";
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

            case "clear":
                this._lines.forEach(line => line.remove());
                this._lines = [];
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

        line._inputElem.focus();
        line._inputElem.addEventListener("keydown", e => {
            if (e.code === "Enter") {
                e.preventDefault();
                this.handleInput(line);
            }
        });

        return line;
    }

}

(async () => {
    const terminal = new Terminal(document.querySelector("#content .terminal-body-content"));
    window.terminal = terminal;
    
})();