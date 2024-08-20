
import styles from "./TerminalLine.module.css";

export interface TerminalLineProps {
	user?: string;
	directory?: string;

	reference?: React.Ref<HTMLElement>;
	children?: string | JSX.Element;
}

export default function TerminalLine (_props: TerminalLineProps) {

	const { user, directory, children, reference } = _props;

	return <div className={styles.line}>
		{user		&& <span className={styles.user}>{user}</span>}
		{directory	&& <span className={styles.directory}>{directory}</span>}
		{children	&& <span ref={reference}>{children}</span>}
	</div>
}