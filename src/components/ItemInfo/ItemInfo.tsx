import React from "react";

import {Tooltip} from "react-tooltip"

import ItemDescription from "../ItemDescription/ItemDescription";

import styles from "./ItemInfo.module.scss";

import { ItemOrEmpty } from "../../types/Item";
import ItemImage from "../ItemImage/ItemImage";

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
                    <ItemImage itemIcon={item.icon} itemName={item.name} scale={1}/>
                </div>
            </header>
            <ItemDescription description={item.description} />
        </>
    );
}
