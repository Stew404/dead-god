import React, { useEffect, useState } from "react";

import styles from "./ItemList.module.scss";
import { useAppSelector } from "@/hooks";
import { AnyElement, ItemWithOptions } from "../../types/Item";
import {
    sortByAlphabet,
    sortByItemId,
    sortByItemQuality,
} from "@/utils/compareFunctions";
import ListHeading from "../ListHeading/ListHeading";
import GroupLayout from "../GroupLayout/GroupLayout";

type compareFunction = (a: any, b: any) => number;

type compareFunctions = Record<string, compareFunction>;

const ItemList = () => {
    const items = useAppSelector((state) => state.items.items);

    const [renderItems, setRenderItems] = useState<AnyElement[]>([]);

    useEffect(() => {
        setRenderItems(items);
    }, [items]);

    const sortType = useAppSelector((state) => state.settings.sortType);

    useEffect(() => {
        console.log("sort");
        const compareFunctions: compareFunctions = {
            id: sortByItemId,
            alphabet: sortByAlphabet,
            quality: sortByItemQuality,
        };

        setRenderItems(
            [...renderItems].sort(
                compareFunctions[sortType as keyof compareFunctions]
            )
        );
    }, [sortType]);

    const filters = useAppSelector((state) => state.items.filters);
    const searchString = useAppSelector((state) => state.items.searchString);

    useEffect(() => {
        const filteredItems = renderItems.map((item) => {
            let isConsistsQuality = true;
            let isConsistsPool = true;
            let isConsistsTag = true;
            let isConsistsSearchString = true;

            if (filters.quality.length > 0) {
                isConsistsQuality = filters.quality?.includes(item.quality);
            }

            if (filters.pool.length > 0) {
                const itemPoolIds = item.pools.map((pool) => pool.poolId);

                const poolIntersection = itemPoolIds.filter((pool) =>
                    filters.pool?.includes(pool)
                );

                isConsistsPool = poolIntersection.length > 0;
            }

            if (filters.tag.length > 0) {
                const itemTagIds = item.tags.map((tag) => tag.tagId);

                filters.tag.map((tag) => {
                    if (tag === "sacred_orb") {
                        if (item.quality < 2) {
                            isConsistsTag = Boolean(item.isQuest);
                        }
                    } else {
                        if (!itemTagIds.includes(tag)) {
                            isConsistsTag = false;
                        }
                    }
                });
            }

            if (searchString.length > 0) {
                const itemSearchArea = [
                    ...Object.values(item.name),
                    ...Object.values(item.ingameDescription),
                    item.description,
                    item.learnMore,
                    item.bookOfVirtues,
                    item.judasBirthright,
                    item.keywords,
                ]
                    .join()
                    .toLowerCase();

                isConsistsSearchString = itemSearchArea.includes(
                    searchString.toLowerCase().trim()
                );
            }

            let resultItem : AnyElement = { ...item };

            resultItem.isHided = !(
                isConsistsQuality &&
                isConsistsPool &&
                isConsistsTag &&
                isConsistsSearchString
            );

            return resultItem;
        });
        
        setRenderItems(filteredItems);
    }, [filters, searchString]);

    return (
        <section className={styles.section}>
            <ListHeading headingText="Предметы" />
            <GroupLayout />
        </section>
    );
};

export default ItemList;
