const React = require("react");
const ReactDOM = require("react-dom");

import { useSelector } from "react-redux";
import styles from "./AsidePanel.module.scss";

import _ from "lodash";
import ItemMainInfo from "../ItemMainInfo/ItemMainInfo";

export default function AsidePanel() {
    const hoveredItem = useSelector((state) => state.hoveredItem.value);

    return (
        <aside className={styles.aside}>
            {!_.isEmpty(hoveredItem) && (
                <ItemMainInfo itemData={hoveredItem}></ItemMainInfo>
            )}
        </aside>
    );
}
