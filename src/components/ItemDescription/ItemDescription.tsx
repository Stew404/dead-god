import React from "react";

import styles from "./ItemDescription.module.scss"

// import { parse } from "node-html-parser";
// import { useEffect } from "react";
// import { renderToStaticMarkup } from "react-dom/server";
// import { useSelector } from "react-redux";

// import { getItemByName } from "../../utils/itemsFunctions";
// import ItemMainInfo from "../ItemMainInfo/ItemMainInfo";
import { prepareDescription } from "../../utils/prepareDescription";

const replaceItemKeywords = (description: string) => {
    const re = /item:\[[^\]]+\]/gi;
    let str = description;
    const matches = [...str.matchAll(re)];

    matches.map(([keywordRe]) => {
        let replaceValue = `
            <span data-item="${keywordRe.slice(6, -1)}">
            </span>`;
        str = str.replace(keywordRe, replaceValue);
    });
    return str;
};

// const convertToJSX = (childNodes) => {
//     return childNodes.map((node) => {
//         switch (node.nodeType) {
//             case 1:
//                 const Tag = node.tagName.toLowerCase();
//                 let content = node.textContent;

//                 if (Tag == "br") {
//                     return <Tag />;
//                 }

//                 const tagStyle = {};

//                 if (node.attrs["data-color"]) {
//                     tagStyle.color = node.attrs["data-color"];
//                 }

//                 let tooltipContent;
//                 if (node.attrs["data-tooltip"]) {
//                     tooltipContent = node.attrs["data-tooltip"];
//                     tagStyle.cursor = "help";
//                     tagStyle.textDecoration = "underline dotted #979696";
//                     tagStyle.textDecorationThickness = "1px";
//                 }

//                 if (node.attrs["data-item"]) {
//                     const item = getItemByName(node.attrs["data-item"]);

//                     content = (
//                         <>
//                             <img
//                                 src={item.item_icon}
//                                 style={{
//                                     height: "15px",
//                                     objectFit: "contain",
//                                     marginRight: "3px",
//                                 }}
//                             />
//                             {item.item_name}
//                         </>
//                     );

//                     tooltipContent = renderToStaticMarkup(
//                         <ItemMainInfo itemData={item}></ItemMainInfo>
//                     );

//                     console.log(tooltipContent);

//                     tagStyle.cursor = "help";
//                     tagStyle.textDecoration = "underline dotted #979696";
//                     tagStyle.textDecorationThickness = "1px";
//                 }

//                 return (
//                     <Tag
//                         style={tagStyle}
//                         data-tip={tooltipContent}
//                         data-html={true}
//                     >
//                         {content}
//                     </Tag>
//                 );
//             case 3:
//                 return node.textContent;
//         }
//     });
// };

export default function ItemDescription({ description }: {description: string}) {
    // const blocks = parse(description, "text/html").childNodes.filter(
    //     (child) => child.nodeType == 1
    // );

    // console.log(blocks);
    return (
        <article className={styles.description} 
        dangerouslySetInnerHTML={{
            __html: prepareDescription(description)
        }}>
            {/* {blocks.map((p, index) => {
                return <p key={index}>{convertToJSX(p.childNodes)}</p>;
            })} */
            }
        </article>
    );
}
