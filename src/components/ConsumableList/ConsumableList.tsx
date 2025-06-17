import React, { useEffect, useState } from "react";

import styles from "./ConsumableList.module.scss";

import Item from "../Item/Item";
import { useAppSelector } from "@/hooks";
import { sortByAlphabet, sortByItemId } from "@/utils/compareFunctions";
import ListHeading from "../ListHeading/ListHeading";
import SubList from "../SubList/SubList";
import { AnyElement } from "@/types/Item";

const ConsumableList = () => {
    const consumables = useAppSelector((state) => state.items.consumables);

    const [renderConsumables, setRenderConsumables] = useState<
        AnyElement[]
    >([]);

    useEffect(() => {
        setRenderConsumables(consumables);
    }, [consumables]);

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
            setRenderConsumables(
                [...renderConsumables].sort(
                    compareFunctions[sortType as keyof compareFunctions]
                )
            );
        }
    }, [sortType]);

    const filters = useAppSelector((state) => state.items.filters);
    const searchString = useAppSelector((state) => state.items.searchString);

    useEffect(() => {
        const filteredConsumables = renderConsumables.map((consumable) => {
            let isConsistsSearchString = true;

            if (searchString.length > 0) {
                const consumableSearchArea = [
                    ...Object.values(consumable.name),
                    ...Object.values(consumable.ingameDescription),
                    consumable.description,
                    consumable.learnMore,
                    consumable.keywords,
                ]
                    .join()
                    .toLowerCase();

                isConsistsSearchString = consumableSearchArea.includes(
                    searchString.toLowerCase().trim()
                );
            }

            let resultConsumable: AnyElement = { ...consumable };

            resultConsumable.isHided = !isConsistsSearchString;

            return resultConsumable;
        });
        setRenderConsumables(filteredConsumables);
    }, [filters, searchString]);

    const renderCardsAndRunes = renderConsumables.filter(
        (item) => item.type === "card_or_rune"
    );
    const renderPills = renderConsumables.filter(
        (item) => item.type === "pill"
    );
    const renderEnvironment = renderConsumables.filter(
        (item) => item.type === "environment"
    );
    const renderPickups = renderConsumables.filter(
        (item) => item.type === "pickup"
    );
    const renderTransformations = renderConsumables.filter(
        (item) => item.type === "transformation"
    );

    return (
        <section className={styles.section}>
            <ListHeading headingText="Расходники" />
            <SubList items={renderCardsAndRunes} headingText="Карты и руны" />
            <SubList items={renderPills} headingText="Пилюли" />
            <SubList
                items={renderTransformations}
                headingText="Трансформации"
            />
            <SubList items={renderPickups} headingText="Пик-апы" />
            <SubList items={renderEnvironment} headingText="Окружение" />
        </section>
    );
};

export default ConsumableList;
