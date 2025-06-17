import Item from "../Item/Item";
import styles from "./SubList.module.scss";
import { AnyElement, BilingualObject} from "../../types/Item";
import { useCurrentLanguageName } from "@/hooks/useCurrentLanguageName";

export default function SubList({
    items,
    headingText,
    headingObj = undefined,
}: {
    items: AnyElement[];
    headingText: string;
    headingObj?: BilingualObject;
}) {
    const headingWithLanguage = useCurrentLanguageName(headingObj);

    return (
        <div>
            <h3 className={styles.heading}>
                {headingWithLanguage ? headingWithLanguage : headingText}
            </h3>
            <div className={styles.items}>
                {items.map((item, index) => {
                    return <Item item={item} key={index} />;
                })}
            </div>
        </div>
    );
}
