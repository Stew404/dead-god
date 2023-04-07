import React from "react";

import styles from "./ItemList.module.scss";

import Item from "../Item/Item";
import { useAppSelector } from "@/hooks";

// import _ from "lodash";

const ItemList = () => {
    const items = useAppSelector((state) => state.items.value);

    // if (_.isEmpty(items)) {
    //     return <main />;
    // }

    return (
        <main className={styles.items}>
            {items.map((item, index) => {
                return <Item item={item} key={index} />;
            })}
        </main>
    );
};

export default React.memo(ItemList);
