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

		const isChar = event.key.length === 1;

		const val = event.currentTarget.textContent ?? "";
		const command = isChar ? val + event.key : val;

		// Autocomplete commands
        if (command.length > 0 && isChar)
            recommendation = autoComplete(command, history.getHistoryState());
		
		// // Update autocomplete
		// // Assume alphanumeric characters
		// if (event.key.length === 1) {
		// 	const str = (command ?? "") + event.key;
		// 	const hint = str.slice(val.length);
		// 	console.log(command, "-", hint);
		// }
		const hint = recommendation ? recommendation.slice(command.length) : "";
		event.currentTarget.setAttribute("data-autocomplete", hint);

		// TODO: Allow custom keyboard shortcuts
		// TODO: Cache current input when up and down arrows are pressed
		switch (event.key) {

			// Autocomplete commands
			case "Tab":
				if (event.shiftKey || !recommendation) break;
				event.preventDefault();

				event.currentTarget.textContent = recommendation;
				
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

				event.currentTarget.textContent = "";

                break;

			// Navigate previous history
			case "ArrowUp":
				if (event.shiftKey) break;

				event.preventDefault();

				const prevCmd = history.getPreviousCommand();
                if (prevCmd) {
                    event.currentTarget.textContent = prevCmd;
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
                    event.currentTarget.textContent = nextCmd;
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

	// Focus input when clicked
	return <div onClick={e => (e.currentTarget.querySelector("[contentEditable]") as HTMLSpanElement)?.focus()}>
		<span className={lineStyles.user}>{user}</span>
		<span className={lineStyles.directory}>{directory}</span>
		<span contentEditable={true} className={styles.input} onKeyDown={onKeyDown}>{value}</span>
	</div>
}