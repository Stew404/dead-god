import React from "react";

import styles from "./ItemMainInfo.module.scss";

const cleanDescription = (description) => {
    const re = /item:\[[^\]]+\]/gi;
    let str = description;
    if (str) {
        const matches = [...str.matchAll(re)];
        matches.map(([keywordRe]) => {
            let replaceValue = keywordRe.slice(6, -1);
            str = str.replace(keywordRe, replaceValue);
        });
    }
    return str;
};

export default function ItemMainInfo({ itemData }) {
    return (
        <div className={styles.item}>
            <header className={styles.item__header}>
                <div className={styles["item__info"]}>
                    <p className={styles["item__quality"]}>
                        Качество: {itemData.item_quality}
                    </p>
                    <p className={styles["item__id"]}>ID: {itemData.item_id}</p>
                </div>
                <div className={styles["item__main"]}>
                    <h3 className={styles["item__title"]}>
                        {itemData.item_name}
                    </h3>
                    <p className={styles["item__ingame-description"]}>
                        &quot;{itemData.item_ingame_description}&quot;
                    </p>
                </div>
            </header>
            <article
                dangerouslySetInnerHTML={{
                    __html: cleanDescription(itemData.item_description),
                }}
                className={styles.item__description}
            ></article>
        </div>
    );
}
