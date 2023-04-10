import React from "react";

import styles from "./ItemMainInfo.module.scss";
import { useAppSelector } from "@/hooks";

import _ from "lodash";

import { prepareAsideDescription } from "@/utils/prepareAsideDescription";
import { ItemOrEmpty } from "../../types/Item";
import ItemImage from "../ItemImage/ItemImage";

export default function ItemMainInfo({item, type} : {item?: ItemOrEmpty, type: string}) {

    item = _.isEmpty(item) ? useAppSelector((state) => state.hoveredItem.value) : item

    if(_.isEmpty(item)){
        return null
    }

    const headers = {
        aside: 
            <header className={styles.item__header}>
                <div className={styles["item__info_aside"]}>
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
            </header>,
        tooltip: 
            <header className={`${styles["item__header_tooltip"]}`}>
                <div className={styles["item__info_tooltip"]}>
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
                <ItemImage itemIcon={item.icon} itemName={item.name}/>
            </header>

    } 

    return (
        <div className={styles.item}>
            {headers[type as keyof object]}
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
