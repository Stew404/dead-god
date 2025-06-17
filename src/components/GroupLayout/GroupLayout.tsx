import { useAppSelector } from "@/hooks";
import SubList from "../SubList/SubList";
import { AnyElement, BilingualObject} from "@/types/Item";
import { useEffect, useState } from "react";

interface Group {
    headingText: string;
    headingObj?: BilingualObject;
    generateItems: () => AnyElement[];
}

type Layout = Group[];

type Layouts = Record<string, Layout>;

export default function GroupLayout() {
    const groupType = useAppSelector((state) => state.settings.groupType);
    const allItems = useAppSelector((state) => state.items);
    const transformations = useAppSelector(
        (state) => state.transformations.value
    );
    const isGreedModeEnabled = useAppSelector(
        (state) => state.settings.isGreedModeEnabled
    );
    const poolsState = useAppSelector((state) => state.pools.value);

    const defaultPools = poolsState.filter(
        (pool) => !pool.poolId.includes("greed")
    );
    const greedPools = [
        ...poolsState
            .filter((pool) => pool.poolId.includes("greed"))
            .map((pool) => {
                return {
                    id: pool.id,
                    name: {
                        en: `Greed ${pool.name.en}`,
                        ru: `${pool.name.ru} режима жадности`,
                    },
                    poolId: pool.poolId,
                };
            }),
        ...defaultPools.slice(7),
    ].filter((pool) => {
        const greedImpossiblePools = [
            "library",
            "ultra_secret_room",
            "planetarium",
            "moms_chest",
        ];

        return !greedImpossiblePools.includes(pool.poolId);
    });

    useEffect(() => {
        setLayout(layouts[groupType]);
    }, [groupType, allItems]);

    const pools = isGreedModeEnabled ? greedPools : defaultPools;

    const layouts: Layouts = {
        category: [
            {
                headingText: "Rebirth",
                generateItems: function () {
                    return [...allItems.items].filter((item) =>
                        item.tags.map((tag) => tag.tagId).includes("rebirth")
                    );
                },
            },
            {
                headingText: "Afterbirth",
                generateItems: function () {
                    return [...allItems.items].filter((item) =>
                        item.tags.map((tag) => tag.tagId).includes("afterbirth")
                    );
                },
            },
            {
                headingText: "Afterbirth+",
                generateItems: function () {
                    return [...allItems.items].filter((item) =>
                        item.tags
                            .map((tag) => tag.tagId)
                            .includes("afterbirth_plus")
                    );
                },
            },
            {
                headingText: "Repentance",
                generateItems: function () {
                    return [...allItems.items].filter((item) =>
                        item.tags.map((tag) => tag.tagId).includes("repentance")
                    );
                },
            },
        ],
        transformation: [
            ...transformations.map((transformation) => {
                return {
                    headingText: transformation.name.en,
                    headingObj: transformation.name,
                    generateItems: function () {
                        return [
                            ...allItems.items,
                            ...allItems.trinkets,
                            ...allItems.consumables,
                        ].filter((item) => {
                            if (!item.transformations) {
                                return false;
                            }

                            return item.transformations
                                .map(
                                    (transformation) =>
                                        transformation.transformationId
                                )
                                .includes(transformation.transformationId);
                        });
                    },
                };
            }),
        ],
        pool: [
            ...pools.map((pool) => {
                return {
                    headingText: pool.name.en,
                    headingObj: pool.name,
                    generateItems: function () {
                        return [...allItems.items].filter((item) => {
                            if (!item.pools) {
                                return false;
                            }

                            return item.pools
                                .map((pool) => pool.poolId)
                                .includes(pool.poolId);
                        });
                    },
                };
            }),
        ],
    };

    const [layout, setLayout] = useState(layouts.category);

    return (
        <>
            {layout.map((group, index) => {
                const items = group.generateItems();

                return (
                    <SubList
                        headingText={group.headingText}
                        items={items}
                        headingObj={group.headingObj}
                        key={`sublist-${index}`}
                    />
                );
            })}
        </>
    );
}
