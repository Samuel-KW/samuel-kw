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

	let recommendation: string | null = "help";

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

		const isChar = event.key.length === 1;

		const val = event.currentTarget.value;
		const command = isChar ? val + event.key : val;

		// TODO: Allow custom keyboard shortcuts
		// TODO: Cache current input when up and down arrows are pressed
		switch (event.key) {

			case "Escape":
				event.currentTarget.blur();
				break; 

			// Autocomplete commands
			case "Tab":
				event.preventDefault();
				if (event.shiftKey || !recommendation) break;

				event.currentTarget.value = recommendation;
				
				// Clear the autocomplete
				recommendation = null;
				event.currentTarget.setAttribute("data-autocomplete", "");

				setCursorToEnd(event.currentTarget as HTMLElement);

				break;

			// Submit command
			case "Enter":
				if (event.shiftKey) break;

                event.preventDefault();
				history.addCommand(command);

				if (_props.onSubmit)
					_props.onSubmit(command);

				event.currentTarget.value = "";

                break;

			// Navigate previous history
			case "ArrowUp":
				if (event.shiftKey) break;

				event.preventDefault();

				const prevCmd = history.getPreviousCommand();
                if (prevCmd) {
                    event.currentTarget.value = prevCmd;
                    sound.interact();
                } else {
                    sound.error();
                }
				
				break;

			// Navigate next history
			case "ArrowDown":
				if (event.shiftKey) break;

				event.preventDefault();

				const nextCmd = history.getNextCommand();
                if (nextCmd) {
                    event.currentTarget.value = nextCmd;
                    sound.interact();
                } else {
                    sound.error();
                }

				break;

			default:

                // Allow typical keys to play typing sound
                if (isChar) sound.type();

				break;
		}
		
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		const command = event.currentTarget.value.trim();

		// Autocomplete commands
		recommendation = command.length < 1 ? null: autoComplete(command, history.getHistoryState());
		
		const hint = recommendation ? recommendation.slice(command.length) : "";
		event.currentTarget.setAttribute("data-autocomplete", hint);
	};

	// Focus input when clicked
	return <div onClick={e => (e.currentTarget.querySelector("input") as HTMLInputElement).focus()} className={styles.line}>
		<label className={styles.desc}>
			<span className={lineStyles.user}>{user}</span>
			<span className={lineStyles.directory}>{directory}</span>
		</label>
		<input className={styles.input} onChange={onChange} onKeyDown={onKeyDown} autoComplete="off" spellCheck="false" autoCapitalize="off">{value}</input>
	</div>
}
