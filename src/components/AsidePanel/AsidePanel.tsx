import React from "react";

import styles from "./AsidePanel.module.scss";

import _ from "lodash";
import ItemMainInfo from "../ItemMainInfo/ItemMainInfo";
import { useAppSelector } from "@/hooks";

export default function AsidePanel() {
    const hoveredItem = useAppSelector((state) => state.hoveredItem.value);
    const asideContent = !_.isEmpty(hoveredItem) ? (
        <ItemMainInfo item={hoveredItem} type="aside" />
    ) : null;

    return <aside className={styles.aside}>{asideContent}</aside>;
}
