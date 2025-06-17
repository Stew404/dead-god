import React from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
    set as setHoveredItem,
    clear as clearHoveredItem,
} from "@/redux/slices/hoveredItemSlice";
import { set as setModalItem } from "@/redux/slices/modalItemSlice";
import { open as openModal } from "@/redux/slices/modalSlice";

import Image from "next/image";
import styles from "./Item.module.scss";
import type { AnyElement, Item } from "../../types/Item";

interface hideStyles {
    hide: {
        display: string;
    };
    fade: {
        opacity: string;
    };
}

export default function Item({
    item,
}: {
    item: AnyElement;
}) {
    const dispatch = useAppDispatch();

    const iconWidth = item.icon.width * 0.7;
    const iconHeight = item.icon.height * 0.7;

    const iconUrl = item.icon.url.includes("http")
        ? item.icon.url
        : `https://admin.${location.hostname
              .split(".")
              .reverse()
              .splice(0, 2)
              .reverse()
              .join(".")}${item.icon.url}`;

    let wrapperStyle = {
        width: `${iconWidth}px`,
        height: `${iconHeight}px`,
    };

    const hideType = useAppSelector((state) => state.settings.hideType);

    const hideStyles = {
        hide: {
            display: "none",
        },
        fade: {
            opacity: ".1",
        },
    };

    const hideStyle = hideStyles[hideType as keyof hideStyles];

    if (item.isHided) {
        return (
            <div
                className={styles.item}
                style={{
                    ...wrapperStyle,
                    ...hideStyle,
                }}
            >
                <Image
                    className={styles.img}
                    src={iconUrl}
                    alt={item.name.en}
                    width={iconWidth}
                    height={iconHeight}
                />
            </div>
        );
    }

    const mouseOverHandler = () => {
        dispatch(setHoveredItem(item));
    };

    const mouseOutHandler = () => {
        dispatch(clearHoveredItem());
    };

    const onClickHandler = () => {
        dispatch(setModalItem(item));
        dispatch(openModal());
    };

    return (
        <div
            className={styles.item}
            style={wrapperStyle}
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
            onClick={onClickHandler}
        >
            <Image
                className={styles.img}
                src={iconUrl}
                alt={item.name.en}
                width={iconWidth}
                height={iconHeight}
            />
        </div>
    );
}
