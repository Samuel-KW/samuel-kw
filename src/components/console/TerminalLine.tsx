
import styles from "./TerminalLine.module.css";

export interface TerminalLineProps {
	user: string;
	directory: string;
	content: string;

	children: string | JSX.Element;
}

export default function TerminalLine (_props: Partial<TerminalLineProps>) {

	const { user, directory, content, children } = _props;

	return <div className={styles.line}>
		{user		&& <span className={styles.user}>{user}</span>}
		{directory	&& <span className={styles.directory}>{directory}</span>}
		{content	&& <span>{content}</span>}
		{children	&& <span>{children}</span>}
	</div>
}