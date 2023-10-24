import React, { useMemo } from "react";

import styles from "./ItemList.module.scss";

import Item from "../Item/Item";
import { useAppSelector } from "@/hooks";

const ItemList = () => {
    const items = useAppSelector((state) => state.items.items);
    const isSettingsOpened = useAppSelector((state)=> state.settings.value)

    const widthStyle = {
        maxWidth: isSettingsOpened ? "calc(100vw - var(--aside-width) - var(--settings-width))" : "calc(100vw - var(--aside-width))"
    }

    const filters = useAppSelector((state) => state.items.filters)

    const filtersIsEmpty = Object.values(filters).every(filter => filter.length === 0)

    const filteredItems = useMemo(()=>{
        const filteredItems = filtersIsEmpty
        ? items
        : items.map((item)=>{
            let isShowed = true
           
            if(!filters.quality?.includes(item.quality)){
                isShowed = false
            }

            return isShowed ? item : {icon: item.icon, name: item.name}
        })

        return filteredItems
    }, [filters])

    return (
        <main className={styles.items} style={widthStyle}>
            {filteredItems.map((item, index) => {

                //TODO
                //create Item and HidedItem component
                return <Item item={item} key={index} />;

            })}
        </main>
    );
};

export default React.memo(ItemList);
