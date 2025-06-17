import React from "react";
import Image from "next/image";
import { GameElement } from "@/types/Item";
import styles from "./ElementImage.module.scss";

export default function ElementImage({
    elementIcon,
    elementName,
    scale = 0.7,
}: {
    elementIcon: GameElement["icon"];
    elementName: GameElement["name"];
    scale?: number;
}) {
    if (!elementIcon) {
        return null;
    }
    const iconWidth = elementIcon.width * scale;
    const iconHeight = elementIcon.height * scale;

    let wrapperStyle = {
        width: `${iconWidth}px`,
        height: `${iconHeight}px`,
        display: "block",
    };

    const elementIconUrl = elementIcon.url.includes("http")
        ? elementIcon.url
        : `https://admin.${location.hostname
              .split(".")
              .reverse()
              .splice(0, 2)
              .reverse()
              .join(".")}${elementIcon.url}`;

    return (
        <div style={wrapperStyle}>
            <Image
                className={styles.img}
                src={elementIconUrl}
                alt={elementName.en}
                width={iconWidth}
                height={iconHeight}
            />
        </div>
    );
}
