import React from "react";

import styles from "./ItemMainInfo.module.scss";
import { useAppSelector } from "@/hooks";

import _ from "lodash";

import { prepareAsideDescription } from "@/utils/prepareAsideDescription";

export default function ItemMainInfo() {

    const item = useAppSelector((state) => state.hoveredItem.value);

    if(_.isEmpty(item)){
        return null
    }

    return (
        <div className={styles.item}>
            <header className={styles.item__header}>
                <div className={styles["item__info"]}>
                    <p className={styles["item__quality"]}>
                        Качество: {item.quality}
                    </p>
                    <p className={styles["item__id"]}>ID: {item.id}</p>
                </div>
                <div className={styles["item__main"]}>
                    <h3 className={styles["item__title"]}>
                        {item.name.en}
                    </h3>
                    <p className={styles["item__ingame-description"]}>
                        &quot;{item.ingameDescription.en}&quot;
                    </p>
                </div>
            </header>
            <article
                dangerouslySetInnerHTML={{
                    __html: prepareAsideDescription(item.description),
                }}
                className={styles.item__description}
            >
            </article>
            <article
                className={styles.item__description}>
                {item.transformations.map((transformation)=>{
                    return <p style={{color: "#FBCEB1"}} key={transformation.id}>
                        Часть превращения {transformation.name.en}
                    </p>
                })}
            </article>
        </div>
    );
}
