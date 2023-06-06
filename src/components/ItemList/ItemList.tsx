import React from "react";

import styles from "./ItemList.module.scss";

import Item from "../Item/Item";
import { useAppSelector } from "@/hooks";

// import _ from "lodash";

const ItemList = () => {
    const items = useAppSelector((state) => state.items.value);
    const isSettingsOpened = useAppSelector((state)=> state.settings.value)

    const widthStyle = {
        maxWidth: isSettingsOpened ? "calc(100vw - var(--aside-width) - 400px)" : "calc(100vw - var(--aside-width))"
    }

    return (
        <main className={styles.items} style={widthStyle}>
            {items.map((item, index) => {
                return <Item item={item} key={index} />;
            })}
        </main>
    );
};

export default React.memo(ItemList);
