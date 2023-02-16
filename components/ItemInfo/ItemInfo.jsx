import React from "react";

import ItemDescription from "../ItemDescription/ItemDescription";

import styles from "./ItemInfo.module.scss";

export default function ItemInfo({ itemData }) {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.id}>ID: {itemData.item_id}</p>
                    <p className={styles.quality}>
                        Качество: {itemData.item_quality}
                    </p>
                </div>
                <div>
                    <h3 className={styles.title}>{itemData.item_name}</h3>
                    <p className={styles.ingame_description}>
                        &quot;{itemData.item_ingame_description}&quot;
                    </p>
                </div>
                <div>
                    <img src={itemData.item_icon} alt="" />
                </div>
            </header>
            <article className={styles.description}>
                <ItemDescription rawDescription={itemData.item_description} />
                {/* ${transformationsStr} */}
            </article>
        </>
    );
}
