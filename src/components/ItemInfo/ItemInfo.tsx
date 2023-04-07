import React from "react";

import ItemDescription from "../ItemDescription/ItemDescription";

import styles from "./ItemInfo.module.scss";

import { ItemOrEmpty } from "../../types/Item";

export default function ItemInfo({ item }: {item: ItemOrEmpty}) {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.id}>ID: {item.id}</p>
                    <p className={styles.quality}>Качество: {item.quality}</p>
                </div>
                <div>
                    <h3 className={styles.title}>{item.name.en}</h3>
                    <p className={styles.ingame_description}>
                        &quot;{item.ingameDescription.en}&quot;
                    </p>
                </div>
                <div>
                    <img src={item.icon.url} alt={item.name.en} />
                </div>
            </header>
            <ItemDescription description={item.description} />
        </>
    );
}
