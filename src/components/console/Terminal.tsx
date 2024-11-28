
import { useState, useRef, useEffect } from "react";
import { Minimize, Expand, Close } from "./Controls";
import styles from "./Terminal.module.css";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import Welcome from "./commands/welcome";
import Typer from "../utils/DynamicType";
import Draggable from "../utils/draggable";

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

    const typingElement = useRef(null);
    const typerRef = useRef<Typer | null>(null);

    const dragElement = useRef(null);
    const dragBar = useRef(null);

    useEffect(() => {
        if (!typerRef.current) {
            typerRef.current = new Typer(typingElement);
            typerRef.current.playSound = true;
            typerRef.current.startTyping(['Hello, World!', 'TypeScript is awesome!']);
        }

        Draggable({ containerRef: dragElement, dragItemRef: dragBar });
    }, []);

    return <div ref={dragElement}>
        <div className={styles.terminal} style={{ opacity: opened ? 1 : 0 }} role="window" aria-label="Terminal window">
            <div ref={dragBar} className={styles.bar}>
                <span className={styles.header}>Portfolio - Samuel Walls</span>
                <span className={styles.controls}>
                    <Minimize onClick={() => setMinimized(!minimized)} />
                    <Expand onClick={() => setMaximized(!maximized)} />
                    <Close onClick={() => setOpened(false)} />
                </span>
            </div>

            <div className={styles.body}>
                <div className={styles.content}>
                    <Welcome />
                    <TerminalLine user="root" directory={window.location.pathname} reference={typingElement}>Welcome to my website!</TerminalLine>
                    <TerminalInput user="root" directory={window.location.pathname} onSubmit={console.log}/>
                    {/* <ascii-img src="../images/day 3.webp" width="1920" height="1080" scale=".25" color="#ffffff" alt="Cinematic picture of a field of dandylions against a snow-capped mountain range."></ascii-img> */}
                </div>
            </div>
        </div>
    </div>
}