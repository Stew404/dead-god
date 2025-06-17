import "dotenv/config";

import postgres from "postgres";

import Head from "next/head";
import Header from "@/components/Header/Header";
import Body from "@/components/Body/Body";

import { MenuItem, MenuItems } from "@/types/NavMenu";
import { AnyElement, Pool, Tag, Transformation } from "@/types/Item";

import { useAppDispatch } from "../hooks";
import { useEffect } from "react";

import { set as setNavMenuItems } from "@/redux/slices/navMenuItemsSlice";
import { set as setPools } from "@/redux/slices/poolsSlice";
import { set as setTags } from "@/redux/slices/tagsSlice";
import { set as setTransformations } from "@/redux/slices/transformationsSlice";
import {
    setItems,
    setTrinkets,
    setConsumables,
} from "@/redux/slices/itemsSlice";

const db_url = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
console.log(db_url);
const sql = postgres(db_url, {
    transform: postgres.camel,
});

export default function Home({
    navMenuItems,
    items,
    trinkets,
    consumables,
    pools,
    tags,
    transformations,
}: {
    navMenuItems: MenuItems;
    items: AnyElement[];
    trinkets: AnyElement[];
    consumables: AnyElement[];
    pools: Pool[];
    tags: Tag[];
    transformations: Transformation[];
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setNavMenuItems(navMenuItems));
    }, [navMenuItems]);

    useEffect(() => {
        dispatch(setItems(items));
        dispatch(setTrinkets(trinkets));
        dispatch(setConsumables(consumables));

        dispatch(setPools(pools));
        dispatch(setTags(tags));
        dispatch(setTransformations(transformations));
    }, []);

    return (
        <>
            <Head>
                <title>Dead God TS</title>
                <meta
                    name="description"
                    content="Dead God created with NextJS and TS"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Body />
            <div id="modal"></div>
        </>
    );
}

const getNavMenuItems = async () => {
    const res = await fetch("https://dead-god.ru/wp-json/myplugin/v1/menu");
    const menuItems = await res.json();

    return menuItems.map((menuItem: MenuItem) => {
        return {
            title: menuItem.title,
            url: menuItem.url,
        };
    });
};

export async function getStaticProps() {
    const navMenuItems = await getNavMenuItems();
    const items = await sql`
            WITH items_with_pools AS (SELECT 
            vanilla_items.*,
            json_agg(json_build_object('id', pools.id, 'name', pools.name, 'poolId', pools.pool_id)) AS pools
            FROM vanilla_items
            LEFT OUTER JOIN pool_to_vanillaitem as po
            ON vanilla_items.unique_id = po.item_unique_id
            LEFT OUTER JOIN pools
            ON po.pool_id = pools.id					 
            GROUP BY vanilla_items.unique_id
            ORDER BY vanilla_items.id)

            , items_with_transformations AS (SELECT 
                vanilla_items.*, 
                coalesce(json_agg(json_build_object('name', transformations.name, 'id', transformations.id, 'transformationId', transformations.transformation_id)) FILTER (where transformations.name is not null)) AS transformations
            FROM vanilla_items
            LEFT OUTER JOIN transformation_to_vanillaitem as tr
            ON vanilla_items.unique_id = tr.item_unique_id
            LEFT OUTER JOIN transformations
            ON tr.transformation_id = transformations.id

            GROUP BY vanilla_items.unique_id
            ORDER BY vanilla_items.id)

            , items_with_tags AS (SELECT 
                vanilla_items.*, 
                json_agg(json_build_object('name', tags.name, 'id', tags.id, 'tagId', tags.tag_id)) AS tags
            FROM vanilla_items
            LEFT OUTER JOIN "tag_to_vanillaitem" as tr
            ON vanilla_items.unique_id = tr.item_unique_id
            LEFT OUTER JOIN tags
            ON tr.tag_id = tags.id

            GROUP BY vanilla_items.unique_id
            ORDER BY vanilla_items.id)

            select * from items_with_pools
            full outer join items_with_transformations
            on items_with_pools.unique_id = items_with_transformations.unique_id
            full outer join items_with_tags
            on items_with_transformations.unique_id = items_with_tags.unique_id
        `;
    const trinkets = await sql`
            SELECT trinkets.*,
                json_agg(json_build_object('name', tags.name, 'id', tags.id, 'tagId', tags.tag_id)) AS tags
            FROM trinkets
            LEFT OUTER JOIN tag_to_trinket as tt
            ON trinkets.unique_id = tt.trinket_id
            LEFT OUTER JOIN tags
            ON tt.tag_id = tags.id					 
            GROUP BY trinkets.unique_id
            ORDER BY trinkets.id
            `;
    const pools = await sql`select * from pools`;
    const tags = await sql`select * from tags`;
    const transformations = await sql`select * from transformations`;
    const cardsAndRunes = await sql`select * from cards_and_runes ORDER BY id`;
    const pills = await sql`select * from pills ORDER BY id`;
    const pickups = await sql`select * from pickups ORDER BY id`;
    const environment = await sql`select * from environment ORDER BY id`;
    const transformationsInfo =
        await sql`select * from transformations_info ORDER BY id`;
    return {
        props: {
            navMenuItems: [...navMenuItems],
            items: [...items],
            trinkets: [...trinkets],
            consumables: [
                ...cardsAndRunes,
                ...pills,
                ...pickups,
                ...environment,
                ...transformationsInfo,
            ],
            pools: pools,
            tags: tags,
            transformations: transformations,
        },
    };
}
