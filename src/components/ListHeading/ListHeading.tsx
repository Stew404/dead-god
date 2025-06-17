import styles from "./ListHeading.module.scss";

export default function ListHeading({ headingText }: { headingText: string }) {
    return <h2 className={styles.heading}>{headingText}</h2>;
}
