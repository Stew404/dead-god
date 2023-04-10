import React from "react";

import styles from "./ItemDescription.module.scss"

import ReactDOMServer from "react-dom/server"

import * as htmlToReact from "html-to-react"

import ItemMainInfo from "../ItemMainInfo/ItemMainInfo";

import getItemByName from "@/utils/getItemByName";
import { prepareDescription } from "../../utils/prepareDescription";


export const replaceItemKeywords = (description: string) => {
    const re = /item:\[[^\]]+\]/gi;
    const matches = [...description.matchAll(re)];

    matches.map(([keywordRe]) => {
        const item = getItemByName(keywordRe.slice(6, -1))
        if(item){
            const info = ReactDOMServer.renderToStaticMarkup(<ItemMainInfo item={item} type="tooltip"/>).replaceAll('"', "'")
            const spanStyle = {
                fontStyle: "italic",
                textDecoration: "underline dotted #979696",
                TextDecorationThickness: "1px",
                cursor: "help"
            }

            const imgStyle = {
                maxHeight: "15px",
                marginRight: "3px"
            }

            let replaceValue = ReactDOMServer.renderToStaticMarkup(
                <span data-tooltip-html={info} data-tooltip-id="modal-tooltip" style={spanStyle}>
                    <img src={item.icon.url} alt={item.name.en} style={imgStyle}/>
                    {item.name.en}
                </span>
            )
            description = description.replace(keywordRe, replaceValue);
        }

    });
    const htmlParser = new htmlToReact.Parser()
    return htmlParser.parse(description);
};

export default function ItemDescription({ description }: {description: string}) {
    description = prepareDescription(description)

    return (
        <article className={styles.description}>
            {replaceItemKeywords(description)}
        </article>
    );
}
