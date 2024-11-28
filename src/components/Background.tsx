import styles from "./Background.module.css";

export default function Background() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0"
             viewBox="0 0 12 16" className={styles.bg} preserveAspectRatio="none">
            <path d="m 0 0 l 12 0 c -10 7 1 12 -4 16 l -8 0" className={styles.bgOuter} />
            <path d="m 0 0 l 11 0 c -10 7 1 12 -4 16 l -7 0" className={styles.bgInner} />
        </svg>
    );
};