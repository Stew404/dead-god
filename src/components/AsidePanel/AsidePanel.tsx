import React from "react";

import styles from "./AsidePanel.module.scss";

import _ from "lodash";
import ItemMainInfo from "../ItemMainInfo/ItemMainInfo";

export default function AsidePanel() {
    return (
        <aside className={styles.aside}>
            <ItemMainInfo/>
        </aside>
    );
}
