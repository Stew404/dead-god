import { AccordionItem as AccordionItemOld, AccordionItemProps } from "@szhsin/react-accordion";
import styles from "./AccordionItem.module.scss"

export default function AccordionItem({header, ...rest}: AccordionItemProps){
    return <AccordionItemOld
    {...rest}
    header={
        <>
            <svg className={styles.chevron} width="22" height="9" viewBox="0 0 22 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9772 9L0.472906 0.75L21.4814 0.75L10.9772 9Z" fill="white"></path>
            </svg>
            {header}
        </>
    }
    className={styles.item}
    buttonProps={{
        className: ({ isEnter }) =>
        `${styles.button} ${isEnter && styles.button_opened}`
    }}
    contentProps={{
        className: styles.content
    }}
    panelProps={{
        className: styles.panel
    }}

    />
}