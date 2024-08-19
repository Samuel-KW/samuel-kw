import styles from "./TerminalInput.module.css";
import lineStyles from "./TerminalLine.module.css";


export interface TerminalInput {

    user: string;
	directory: string;
    value?: string;

    onSubmit?: (value: string) => void;
}

export default function TerminalInput (_props: TerminalInput) {

    const { user, directory, value } = _props;

    const onKeyDown = (event: React.KeyboardEvent) => {

        if (event.key === "Enter") {

            event.preventDefault();

            if (_props.onSubmit)
                _props.onSubmit(event?.currentTarget?.textContent);
            }
        }
    };

    return <div className={styles.input}>
        <span className={lineStyles.user}>{user}</span>
        <span className={lineStyles.directory}>{directory}</span>
        <span contentEditable={true} className={styles.input} onKeyDown={onKeyDown}>{value}</span>
    </div>
}