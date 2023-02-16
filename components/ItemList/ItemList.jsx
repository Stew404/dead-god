const React = require("react");

import styles from "./ItemList.module.scss";

import Item from "../Item/Item";
import { useSelector } from "react-redux";

import _ from "lodash";

const ItemList = () => {
    const items = useSelector((state) => state.itemsData.value);

    if (_.isEmpty(items)) {
        return <main />;
    }

    return (
        <main className={styles.items}>
            {items.map((item, index) => {
                return <Item itemData={item} key={index} />;
            })}
        </main>
    );
};

export default React.memo(ItemList);
