class TerminalLine extends HTMLElement {

    static observedAttributes = ["color", "size"];

    constructor() {

        // Always call super first in constructor
        super();
        
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "terminal-line");

        const user = document.createElement("span");
        user.setAttribute("class", "terminal-user");
        user.textContent = this.getAttribute("user") ?? "Guest@Portfolio";

        const delim = document.createElement("span");
        delim.setAttribute("class", "terminal-text");
        delim.textContent = ": ";

        const path = document.createElement("span");
        path.setAttribute("class", "terminal-path");
        path.textContent = this.getAttribute("path") ?? "~/index.html";

        const end = document.createElement("span");
        end.setAttribute("class", "terminal-text");
        end.textContent = "$ ";

        const input = document.createElement("span");
        input.setAttribute("class", "terminal-input");
        input.textContent = this.textContent;

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
            }
            
            .terminal-header {
                color: var(--terminal-header);
            }
        `;

        wrapper.appendChild(user);
        wrapper.appendChild(delim);
        wrapper.appendChild(path);
        wrapper.appendChild(end);
        wrapper.appendChild(input);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

window.customElements.define('terminal-line', TerminalLine);