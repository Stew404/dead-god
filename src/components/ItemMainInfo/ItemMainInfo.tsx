import React, { ElementType } from "react";

import styles from "./ItemMainInfo.module.scss";

import _ from "lodash";

import { prepareAsideDescription } from "@/utils/prepareAsideDescription";
import { AnyElement } from "../../types/Item";
import ItemImage from "../ElementImage/ElementImage";

import Transformations from "../Transformations/Transformations";
import { getCurrentName } from "@/utils/getCurrentName";
import { colorizeText } from "@/utils/preparingFunctions";

interface InfoHeaders {
    aside: JSX.Element;
    tooltip: JSX.Element;
}

interface QualityInfo {
    active: string;
    passive: string;
    pill: string;
}

const getQualityText = (item: AnyElement)=>{
    const qualityInfo: QualityInfo = {
        active: `Качество: ${item.quality}`,
        passive: `Качество: ${item.quality}`,
        pill: `Класс: ${item.class}`,
    };

    return qualityInfo[item.type as keyof QualityInfo];
}

export default function ItemMainInfo({
    item,
    type,
}: {
    item: AnyElement;
    type: string;
}) {
    const name = getCurrentName(item.name);
    let ingameDescription = getCurrentName(item.ingameDescription);
    ingameDescription = colorizeText(ingameDescription);

    

    const qualityText = getQualityText(item);

    const headers: InfoHeaders = {
        aside: (
            <header className={styles.item__header}>
                <div className={styles["item__info_aside"]}>
                    <p className={styles["item__quality"]}>{qualityText}</p>
                    <p className={styles["item__id"]}>ID: {item.id}</p>
                </div>
                <div className={styles["item__main"]}>
                    <h3 className={styles["item__title"]}>{name}</h3>
                    <p
                        className={styles["item__ingame-description"]}
                        dangerouslySetInnerHTML={{ __html: ingameDescription }}
                    >
                        {/* &quot;{ingameDescription}&quot; */}
                    </p>
                </div>
            </header>
        ),
        tooltip: (
            <header className={`${styles["item__header_tooltip"]}`}>
                <div className={styles["item__info_tooltip"]}>
                    <p className={styles["item__quality"]}>{qualityText}</p>
                    <p className={styles["item__id"]}>ID: {item.id}</p>
                </div>
                <div className={styles["item__main"]}>
                    <h3 className={styles["item__title"]}>{name}</h3>
                    <p className={styles["item__ingame-description"]}>
                        &quot;{ingameDescription}&quot;
                    </p>
                </div>
                <ItemImage elementIcon={item.icon} elementName={item.name} />
            </header>
        ),
    };

    return (
        <div className={styles.item}>
            {headers[type as keyof InfoHeaders]}
            <article
                dangerouslySetInnerHTML={{
                    __html: prepareAsideDescription(item.description),
                }}
                className={styles.item__description}
            ></article>
            <article className={styles.item__description}>
                <Transformations transformations={item.transformations} />
            </article>
        </div>
    );
}
