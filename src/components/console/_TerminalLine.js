const delay = delay => new Promise((resolve, reject) => setTimeout(resolve, delay));

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

        this.chars = 'qwertyuiopasdfghjklzxcvbnm';
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

            .terminal-cursor[contenteditable]::after {
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

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "active":
                if (newValue == null) {
                    this.enabled = false;
                    this._inputElem.classList.remove('terminal-cursor');
                    this._inputElem.removeAttribute("contenteditable");
                } else {
                    this.enabled = true;
                    this._inputElem.classList.add('terminal-cursor');
                    this._inputElem.setAttribute("contenteditable", "plaintext-only");
                }
                break;

            case "value":
                this._inputElem.textContent = newValue;
                this._input = newValue;
                break;

            case "user":
                this._userElem.textContent = newValue;
                this._user = newValue;
                break;

            case "path":
                this._pathElem.textContent = newValue;
                this._path = newValue;
        }
        // console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    }

    get value() {
        return this._inputElem.textContent;
    }

    set value(val) {
        this._input = val;
        this._inputElem.textContent = val; 
    }

    /**
     * Starts typing a single phrase
     * @param {string} phrase The phrase to start typing
     * @param {int} speed How fast to type each character in MS
     * @param {float} error Chance of making an error 
     * @returns boolean
     */
    async type(phrase, speed=35, error=0.05) {

        // Type each character in the phrase
        for (let i = 0; i < phrase.length; ++i)
            await this.typeCharacter(phrase[i], speed, error);

        return true;
    }

    /**
     * Adds a single character to a text element with a chance to "mistype" and correct
     * it's mistake
     * @param {char} char The single character to type
     * @param {int} speed How fast to type each character in MS
     * @param {float} error Chance of making an error
     * @returns boolean
     */
    async typeCharacter(char, speed, error) {
        const isMistake = Math.random() < error;

        // Add the character to the element
        this._inputElem.textContent += isMistake ?
            this.chars[Math.floor(Math.random() * this.chars.length)] : char;

        // Remove the error
        if (isMistake) {
            await delay(speed * 5);
            this.deleteCharacter();
            await delay(speed * 3);
        }

        await delay(speed)
        return isMistake ? this.typeCharacter(char, error) : true;
    }   

    /**
     * Delete the most recent character from a text element
     */
    deleteCharacter() {
        this._inputElem.textContent = this._inputElem.textContent.slice(0, -1);
    }

    /**
     * Removes the contents of an element one character at a time
     * @param {int} speed How quickly to delete the contents of the element in MS
     * @returns boolean
     */
    async clear(speed=30) {

        // Base case
        if (this._inputElem.textContent == '')
            return true;

        this.deleteCharacter();

        await delay(speed);
        return this.clear(speed);
    }

}

window.customElements.define('terminal-line', TerminalLine);
