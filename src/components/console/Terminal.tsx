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

import styles from "./Terminal.module.css";

export default function Terminal (_props: Partial<TerminalProps>) {

    return <div className={styles.terminal}>
        <div className={styles.bar}>
            <span className={styles.header}>Portfolio - Samuel Walls</span>
            <span className={styles.controls}>
                <span className={styles.minimize}></span>
                <span className={styles.expand}></span>
                <span className={styles.close}></span>
            </span>
        </div>

        <div className={styles.body}>
            <div className={styles.content}>
                {/* <ascii-img src="../images/day 3.webp" width="1920" height="1080" scale=".25" color="#ffffff" alt="Cinematic picture of a field of dandylions against a snow-capped mountain range."></ascii-img> */}
            </div>
        </div>
    </div>
}