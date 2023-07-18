const delay = delay => new Promise((resolve, reject) => setTimeout(resolve, delay));

class Typer {
    constructor(element) {
        this.element = element;
        this.element.classList.add('typing-cursor');

        this.chars = 'qwertyuiopasdfghjklzxcvbnm';
    }

    /**
     * Starting typing a list of phrases
     * @param {array[string]} phrases An array of phrases to type
     * @param {int} speed How fast to type each character in MS
     * @param {float} error Chance of making an error
     * @param {int} wait Delay in MS between phrases
     * @returns 
     */
    async startTyping(phrases=[], speed=50, error=0.05, wait=4000) {
        
        // Get current phrase to type
        const currPhrase = phrases.pop();
        phrases.unshift(currPhrase);

        // Start typing the phrase
        await this.typePhrase(currPhrase, speed, error);
        
        await delay(wait);

        // Delete current element content
        await this.deleteContent();

        // Start typing next phrase
        return this.startTyping(phrases, speed, error, wait);
    }

    /**
     * Starts typing a single phrase
     * @param {string} phrase The phrase to start typing
     * @param {int} speed How fast to type each character in MS
     * @param {float} error Chance of making an error 
     * @returns boolean
     */
    async typePhrase(phrase, speed, error) {

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
        this.element.textContent += isMistake ?
            this.chars[Math.floor(Math.random() * this.chars.length)] : char;

        // Remove the error
        if (isMistake) {
            await delay(speed * 3)
            this.deleteCharacter();
        }

        await delay(speed)
        return isMistake ? this.typeCharacter(char, error) : true;
    }   

    /**
     * Delete the most recent character from a text element
     */
    deleteCharacter() {
        this.element.textContent = this.element.textContent.slice(0, -1);
    }

    /**
     * Removes the contents of an element one character at a time
     * @param {int} speed How quickly to delete the contents of the element in MS
     * @returns boolean
     */
    async deleteContent(speed=30) {

        // Base case
        if (this.element.textContent == '')
            return true;

        this.deleteCharacter();

        await delay(speed);
        return this.deleteContent(speed);
    }

}

const style = document.createElement('style');
style.textContent = `.typing-cursor::after { animation: cursor_blink 1s steps(1) infinite; display: inline-block; content: '_'; } @keyframes cursor_blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`;;
document.head.appendChild(style);

const handle = new Typer(document.getElementById('titles'));

let words = ['BA in Computer Science', 'UI/UX design', 'Game development', 'Software development', '3D artist'];

delay(4000)
    .then(() => handle.deleteContent())
    .then(() => handle.startTyping(words));
