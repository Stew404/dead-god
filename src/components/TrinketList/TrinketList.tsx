import React, { useEffect, useState } from "react";

import styles from "./TrinketList.module.scss";

import Item from "../Item/Item";
import { useAppSelector } from "@/hooks";
import { sortByAlphabet, sortByItemId } from "@/utils/compareFunctions";
import ListHeading from "../ListHeading/ListHeading";
import { AnyElement, Trinket } from "@/types/Item";

const TrinketList = () => {
    const trinkets = useAppSelector((state) => state.items.trinkets);

    const [renderTrinkets, setRenderTrinkets] = useState<AnyElement[]>(
        []
    );

    useEffect(() => {
        setRenderTrinkets(trinkets);
    }, [trinkets]);

    const sortType = useAppSelector((state) => state.settings.sortType);

    type compareFunction = (a: any, b: any) => number;

    type compareFunctions = Record<string, compareFunction>;

    useEffect(() => {
        console.log("sort");
        const compareFunctions: compareFunctions = {
            id: sortByItemId,
            alphabet: sortByAlphabet,
        };
        if (compareFunctions[sortType]) {
            setRenderTrinkets(
                [...renderTrinkets].sort(
                    compareFunctions[sortType as keyof compareFunctions]
                )
            );
        }
    }, [sortType]);

    const filters = useAppSelector((state) => state.items.filters);
    const searchString = useAppSelector((state) => state.items.searchString);

    useEffect(() => {
        const filteredTrinkets = renderTrinkets.map((trinket) => {
            let isConsistsTag = true;
            let isConsistsSearchString = true;

            if (filters.tag.length > 0) {
                const trinketTagIds = trinket.tags.map((tag) => tag.tagId);

                filters.tag.map((tag) => {
                    if (!["expansion_pack", "moms_box"].includes(tag)) {
                        return;
                    }

                    if (!trinketTagIds.includes(tag)) {
                        isConsistsTag = false;
                    }
                });
            }

            if (searchString.length > 0) {
                const trinketSearchArea = [
                    ...Object.values(trinket.name),
                    ...Object.values(trinket.ingameDescription),
                    trinket.description,
                    trinket.learnMore,
                    trinket.keywords,
                ]
                    .join()
                    .toLowerCase();

                isConsistsSearchString = trinketSearchArea.includes(
                    searchString.toLowerCase().trim()
                );
            }

            let resultTrinket: AnyElement = { ...trinket };

            resultTrinket.isHided = !(isConsistsTag && isConsistsSearchString);

            return resultTrinket;
        });
        setRenderTrinkets(filteredTrinkets);
    }, [filters, searchString]);

    return (
        <section className={styles.section}>
            <ListHeading headingText="Брелоки" />
            <div className={styles.items}>
                {renderTrinkets.map((trinket, index) => {
                    return <Item item={trinket} key={index} />;
                })}
            </div>
        </section>
    );
};

export default TrinketList;
