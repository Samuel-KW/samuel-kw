import styles from "./Controls.module.css";

interface ControlProps {
    onClick(): void;
}

/**
 * Returns a higher-order function that handles keyboard and mouse events.
 * The returned function calls the provided callback function when the Enter key, space bar, or left mouse button is pressed.
 *
 * @param {function} fn - The callback function to be called when the event is triggered. Defaults to an empty function.
 * @return {function} A function that handles keyboard and mouse events.
 */
export const handleUse = (fn = () => {}) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
        if ((event as React.KeyboardEvent).key === "Enter" ||
            (event as React.KeyboardEvent).key === " " ||
            (event as React.MouseEvent).button === 0
        ) {
            event.preventDefault();
            fn();
        }
    }
}

export function Minimize (_props: Partial<ControlProps>) {
    const onUse = handleUse(_props.onClick);
    
    return <div role="button" tabIndex={0} aria-label="Minimize window"
                className={styles.minimize}
                onClick={onUse} onKeyDown={onUse}></div>
}

export function Expand (_props: Partial<ControlProps>) {
    const onUse = handleUse(_props.onClick);

    return <div role="button" tabIndex={0} aria-label="Expand window"
                className={styles.expand}
                onClick={onUse} onKeyDown={onUse}></div>
}

export function Close (_props: Partial<ControlProps>) {
    const onUse = handleUse(_props.onClick);

    return <div role="button" tabIndex={0} aria-label="Close window"
                className={styles.close} 
                onClick={onUse} onKeyDown={onUse}></div>
}