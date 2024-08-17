import styles from "./Controls.module.css";

interface ControlProps {
    onClick(): void;
}

export function Minimize (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.minimize} onClick={onClick}></div>
}

export function Expand (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.expand} onClick={onClick}></div>
}

export function Close (_props: Partial<ControlProps>) {
    const onClick = _props.onClick || (() => {});

    return <div className={styles.close} onClick={onClick}></div>
}