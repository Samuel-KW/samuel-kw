class TerminalLine extends HTMLElement {

    static observedAttributes = ["active", "value", "user", "path"];

    constructor() {

        // Always call super first in constructor
        super();

        this._wrapper = document.createElement("div");
        this._wrapper.setAttribute("class", "terminal-line");

        this._user = "Guest@Portfolio";
        this._userElem = document.createElement("span");
        this._userElem.setAttribute("class", "terminal-user");

        this._path = "~/index.html";
        this._pathElem = document.createElement("span");
        this._pathElem.setAttribute("class", "terminal-path");;

        this._input = null;
        this._inputElem = document.createElement("span");
        this._inputElem.setAttribute("class", "terminal-input");;

        this.enabled = false;
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        this._userElem.textContent = this._user;

        this._pathElem.textContent = this._path;

        const delim = document.createElement("span");
        delim.setAttribute("class", "terminal-text");
        delim.textContent = ": ";

        const end = document.createElement("span");
        end.setAttribute("class", "terminal-text");
        end.textContent = "$ ";

        const style = document.createElement("style");
        style.textContent = `
            .terminal-line {
                font-family: consolas, monospace;
            }

            .terminal-user {
                color: var(--terminal-user);
            }
            
            .terminal-text {
                color: var(--terminal-text);
            }
            
            .terminal-path {
                color: var(--terminal-path);
            }
            
            .terminal-input {
                color: var(--terminal-input);
                outline: none;
            }
            
            .terminal-header {
                color: var(--terminal-header);
            }

            .terminal-cursor::after {
                animation: cursor_blink 1s steps(1) infinite;
                display: inline-block;
                content: '_';
            }

            .terminal-cursor:focus-within::after {
                display: none;
            }
            
            @keyframes cursor_blink {
                0%   { opacity: 1; }
                50%  { opacity: 0; }
                100% { opacity: 1; }
            }
        `;

        this._wrapper.appendChild(this._userElem);
        this._wrapper.appendChild(delim);
        this._wrapper.appendChild(this._pathElem);
        this._wrapper.appendChild(end);
        this._wrapper.appendChild(this._inputElem);

        shadow.appendChild(style);
        shadow.appendChild(this._wrapper);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "active":
                if (newValue != null) {
                    this.enabled = true;
                    this._inputElem.classList.add('terminal-cursor');
                    this._inputElem.setAttribute("contenteditable", "plaintext-only");
                } else {
                    this.enabled = false;
                    this._inputElem.classList.remove('terminal-cursor');
                    this._inputElem.removeAttribute("contenteditable");
                }
                break;

            case "value":
                this._inputElem.textContent = newValue;
                this._input = newValue;
                break;

            case "user":
                this._userElem.textContent = newValue;
                this.user = newValue;
                break;

            case "path":
                this._pathElem.textContent = newValue;
                this._path = newValue;
        }
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    }

    get value() {
        return this.getAttribute("value");
    }

    set value(newValue) {
        this.setAttribute("value", newValue);
    }
}

window.customElements.define('terminal-line', TerminalLine);