import styles from "./TerminalInput.module.css";
import lineStyles from "./TerminalLine.module.css";
import History from "./History";
import autoComplete from "./Autocomplete";
import { sound } from "../audio";



export function setCursorToEnd(contentEditableElement: HTMLElement) {

	// Focus on the contenteditable element
	contentEditableElement.focus();

	// Create a new Range object
	const range = document.createRange();

	// Select the last child node and set the range to the end of it
	range.selectNodeContents(contentEditableElement);
	range.collapse(false); // Collapse the range to the end

	// Get the current Selection
	const selection = window.getSelection();
	if (!selection) return;

	// Clear any existing selections
	selection.removeAllRanges();

	// Add the new range
	selection.addRange(range);
}

export interface TerminalInput {

	user: string;
	directory: string;
	value?: string;

	onSubmit?: (value: string) => void;
}

export default function TerminalInput(_props: TerminalInput) {

	const { user, directory, value } = _props;
	const history = new History();

	let recommendation: string | null = null;

	const onKeyDown = (event: React.KeyboardEvent) => {

		const val = event.currentTarget.textContent ?? "";
		const command = val.trim();
        
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

				const prevCmd = history.getPreviousCommand();
				if (prevCmd) {
					event.currentTarget.textContent = prevCmd;
					setCursorToEnd(event.currentTarget as HTMLElement);
					sound.interact();
				} else {
					sound.error();
				}
				break;

			// Submit command
			case "Enter":
				if (event.shiftKey) break;

                event.preventDefault();
				history.addCommand(command);

                const nextCmd = history.getNextCommand();
                if (nextCmd) {
                    event.currentTarget.textContent = nextCmd;
                    sound.interact();
                } else {
                    sound.error();
                }

                break;

            default:

                // Allow typical keys to play typing sound
                if (event.key.length == 1) sound.type();

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
		
		// Update autocomplete
		const hint = (recommendation ?? "").slice(val.length + 1);
		console.log(command, hint);
		event.currentTarget.setAttribute(
			"data-autocomplete",
			hint
		);
	};

	// Focus input when clicked
	return <div onClick={e => (e.currentTarget.querySelector("[contentEditable]") as HTMLSpanElement)?.focus()}>
		<span className={lineStyles.user}>{user}</span>
		<span className={lineStyles.directory}>{directory}</span>
		<span contentEditable={true} className={styles.input} onKeyDown={onKeyDown}>{value}</span>
	</div>
}