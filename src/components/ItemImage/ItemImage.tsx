import React from "react";
import Image from "next/image";
import { Item } from "@/types/Item";
import styles from "./ItemImage.module.scss"

export default function ItemImage({itemIcon, itemName, scale}: {itemIcon: Item["icon"], itemName: Item["name"], scale?: number}){

    if(!scale){
        scale = 0.7
    }

    const iconWidth = itemIcon.width*scale;
    const iconHeight = itemIcon.height*scale;

    let wrapperStyle = {
        width: `${iconWidth}px`,
        height: `${iconHeight}px`,
        display: "block"
    };

    return(
        <div
        style={wrapperStyle}
        >
            <Image
                className={styles.img}
                src={itemIcon.url}
                alt={itemName.en}
                width={iconWidth}
                height={iconHeight}
            />
        </div>
    )
}