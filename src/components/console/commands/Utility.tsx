import styles from "./Utility.module.css";

interface UtilityProps {
    children: string | JSX.Element;
}

export function Highlight (_props: Partial<UtilityProps>) {
    return <span className={styles.highlight}>
        {_props.children}
    </span>
}

export function Underline (_props: Partial<UtilityProps>) {
    return <span className={styles.underline}>
        {_props.children}
    </span>
}

export function Italic (_props: Partial<UtilityProps>) {
    return <span className={styles.italic}>
        {_props.children}
    </span>
}

export function Bold (_props: Partial<UtilityProps>) {
    return <span className={styles.bold}>
        {_props.children}
    </span>
}

interface LinkProps extends UtilityProps {
    href: string;
}

export function Link (_props: Partial<LinkProps>) {
    return <a href={_props.href} target="_blank" className={styles.link}>
        {_props.children}
    </a>
}