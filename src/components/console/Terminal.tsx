export interface TerminalLine {
    content: string;

    modify(): void;
    remove(): void;
    focus(): void;
}

export interface TerminalInput {

    user: string;
    directory: string;

    content: string;
    value: string;
    
    enabled: boolean;

    focus(): void;    
}


export interface Terminal {

    user: string;
    directory: string;

    lines: TerminalLine[];

    addLine(_props: {
        text: string,
        path?: string,
        user?: string,
        enabled?: boolean
    }): TerminalLine;

    focus(): void;

    typeCharacter(char: string, error?: number): Promise<boolean>;
    type(phrase: string, speed?: number, error?: number): Promise<boolean>;

}

export interface TerminalProps {

    user: string;
    directory: string;

    lines: TerminalLine[];
}

import { useState } from "react";
import styles from "./Terminal.module.css";

interface ControlProps {
    onClick(): void;
}

function Minimize (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.minimize} onClick={onClick}></div>
}

function Expand (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.expand} onClick={onClick}></div>
}

function Close (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.close} onClick={onClick}></div>
}

export default function Terminal (_props: Partial<TerminalProps>) {

    const [opened, setOpened] = useState(true);
    const [maximized, setMaximized] = useState(false);
    const [minimized, setMinimized] = useState(false);

    return <div className={styles.terminal + " " + (maximized ? styles.maximized : "") + " " + (minimized ? styles.minimized : "")} style={{ opacity: opened ? 1 : 0 }}>
        <div className={styles.bar}>
            <span className={styles.header}>Portfolio - Samuel Walls</span>
            <span className={styles.controls}>
                <Minimize onClick={() => setMinimized(!minimized)} />
                <Expand onClick={() => setMaximized(!maximized)} />
                <Close onClick={() => setOpened(false)} />
            </span>
        </div>

        <div className={styles.body}>
            <div className={styles.content}>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                <p>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                {/* <ascii-img src="../images/day 3.webp" width="1920" height="1080" scale=".25" color="#ffffff" alt="Cinematic picture of a field of dandylions against a snow-capped mountain range."></ascii-img> */}
            </div>
        </div>
    </div>
}