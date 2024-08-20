import styles from "./TerminalInput.module.css";
import lineStyles from "./TerminalLine.module.css";
import History from "./History";
import autoComplete from "./Autocomplete";

export interface TerminalInput {

    user: string;
	directory: string;
    value?: string;

    onSubmit?: (value: string) => void;
}

export default function TerminalInput (_props: TerminalInput) {

    const { user, directory, value } = _props;
    const history = new History();

    let recommendation: string | null = null;

    const onKeyDown = (event: React.KeyboardEvent) => {

        const command = (event.currentTarget.textContent ?? "").trim();
        
        // Autocomplete commands
        if (command.length >= 1)
            recommendation = autoComplete(command, history.getHistoryState());

        // TODO: Allow custom keyboard shortcuts
        // TODO: Cache current input when up and down arrows are pressed
        switch (event.key) {

            // Autocomplete commands
            case "Tab":
                if (event.shiftKey || !recommendation) break;
                event.preventDefault();

                event.currentTarget.textContent = recommendation;
                break;

            // Submit command
            case "Enter":
                if (event.shiftKey) break;
            
                event.preventDefault();
                history.addCommand(command);

                if (_props.onSubmit)
                    _props.onSubmit(command);
    
                event.currentTarget.textContent = "";
                break;

            // Navigate previous history
            case "ArrowUp":
                if (event.shiftKey) break;

                event.preventDefault();
                event.currentTarget.textContent = history.getPreviousCommand();
                break;

            // Navigate next history
            case "ArrowDown":
                if (event.shiftKey) break;

                event.preventDefault();
                event.currentTarget.textContent = history.getNextCommand();

                break;
        }
    };

    // Focus input when clicked
    return <div onClick={e => (e.currentTarget.querySelector("[contentEditable]") as HTMLSpanElement)?.focus()}>
        <span className={lineStyles.user}>{user}</span>
        <span className={lineStyles.directory}>{directory}</span>
        <span contentEditable={true} className={styles.input} onKeyDown={onKeyDown}>{value}</span>
    </div>
}