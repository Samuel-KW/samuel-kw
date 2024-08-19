
import { useState } from "react";
import { Minimize, Expand, Close } from "./Controls";
import styles from "./Terminal.module.css";
import TerminalLine from "./TerminalLine";

export interface Terminal {

    user: string;
    directory: string;

    lines: JSX.Element[];

    addLine(_props: {
        text: string,
        path?: string,
        user?: string,
        enabled?: boolean
    }): JSX.Element;

    focus(): void;

    typeCharacter(char: string, error?: number): Promise<boolean>;
    type(phrase: string, speed?: number, error?: number): Promise<boolean>;

}

export interface TerminalProps {

    user: string;
    directory: string;

    lines: JSX.Element[];
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
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                <TerminalLine user="admin" directory={window.location.pathname}>Lorum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</TerminalLine>
                
                {/* <ascii-img src="../images/day 3.webp" width="1920" height="1080" scale=".25" color="#ffffff" alt="Cinematic picture of a field of dandylions against a snow-capped mountain range."></ascii-img> */}
            </div>
        </div>
    </div>
}