import React from "react";
import { sound } from "../Audio";

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Typing class for typing effect
 * @example
 * import React, { useRef, useEffect } from 'react';
 * import Typer from './Typer';
 * 
 * const TypingComponent = () => {
 *     const typingElement = useRef<HTMLDivElement>(null);
 * 
 *     useEffect(() => {
 *         const typer = new Typer(typingElement);
 *         typer.startTyping(['Hello, World!', 'TypeScript is awesome!'], 100, 0.1, 2000);
 *     }, []);
 * 
 *     return <div ref={typingElement}></div>;
 * };
 * 
 * export default TypingComponent;
 */
export default class Typer {
    element: React.RefObject<HTMLElement>;
    chars: string;
    playSound: boolean;

    constructor(element: React.RefObject<HTMLElement>) {
        this.element = element;
        this.chars = "qwertyuiopasdfghjklzxcvbnm";
        this.playSound = false;
    }

    /**
     * Start typing a list of phrases
     * @param phrases An array of phrases to type
     * @param speed How fast to type each character in MS
     * @param error Chance of making an error
     * @param wait Delay in MS between phrases
     * @param sound Play sound when typing
     * @returns 
     */
    async startTyping(
        phrases: string[],
        speed?: number,
        error?: number,
        wait: number = 4000
    ): Promise<void> {

        // Start typing the first phrase
        const currPhrase = phrases.shift()!;
        phrases.push(currPhrase);
        await this.typePhrase(currPhrase, speed, error);
        
        // Wait before clearing the text
        await delay(wait);
        await this.deleteContent();

        // Recursively start typing the next phrase
        return this.startTyping(phrases, speed, error, wait);
    }

    /**
     * Start typing a single phrase
     * @param phrase The phrase to type
     * @param speed How fast to type each character in MS
     * @param error Chance of making an error
     * @returns boolean
     */
    async typePhrase(phrase: string, speed?: number, error?: number): Promise<boolean> {
        for (let i = 0; i < phrase.length; ++i) {
            await this.typeCharacter(phrase[i], speed, error);
        }
        return true;
    }

    /**
     * Adds a single character to a text element with a chance to "mistype" and correct
     * the mistake
     * @param char The single character to type
     * @param speed How fast to type each character in MS
     * @param error Chance of making an error
     * @returns boolean
     */
    async typeCharacter(char: string, speed: number = 50, error: number = 0.05): Promise<boolean> {
        const isMistake = Math.random() < error;

        if (this.element.current) {
            sound.type();
            this.element.current.textContent += isMistake
                ? this.chars[Math.floor(Math.random() * this.chars.length)]
                : char;
        }

        if (isMistake) {
            await delay(speed * 5);
            this.deleteCharacter();
            await delay(speed * 3);
        }

        await delay(speed);
        return isMistake ? this.typeCharacter(char, speed, error) : true;
    }

    /**
     * Delete the most recent character from a text element
     */
    deleteCharacter() {
        if (this.element.current) {
            sound.type();
            this.element.current.textContent = this.element.current.textContent?.slice(0, -1) ?? "";
        }
    }

    /**
     * Removes the contents of an element one character at a time
     * @param speed How quickly to delete the contents of the element in MS
     * @returns boolean
     */
    async deleteContent(speed: number = 30): Promise<boolean> {
        if (this.element.current && this.element.current.textContent === "") {
            return true;
        }

        this.deleteCharacter();
        await delay(speed);
        return this.deleteContent(speed);
    }
}

