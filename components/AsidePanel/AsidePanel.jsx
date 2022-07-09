const React = require('react');
const ReactDOM = require('react-dom');

import { useSelector } from "react-redux";
import styles from "./AsidePanel.module.scss";

import _ from "lodash"

export default function AsidePanel(){

    const hoveredItem = useSelector(state => state.hoveredItem.value)

    const getDescription = () => {
        const re = /item:\[[^\]]+\]/gi;
        let str = hoveredItem.item_description
        if(str){
            const matches = [...str.matchAll(re)]
            matches.map(([keywordRe])=>{
                let replaceValue = keywordRe.slice(6, -1);
                str = str.replace(keywordRe, replaceValue);
            })
        }
        return str
    }

    const infoElem =<div className={styles.aside__info}>
                        <header className={styles.aside__header}>
                            <div className={styles["aside__header-info"]}>
                                <p className={styles["aside__header-quality"]}>Качество: {hoveredItem.item_quality}</p>
                                <p className={styles["aside__header-id"]}>ID: {hoveredItem.item_id}</p>
                            </div>
                            <div className={styles["aside__header-main"]}>
                                <h3 className={styles["aside__header-title"]}>{hoveredItem.item_name}</h3>
                                <p className={styles["aside__header-ingame-description"]}>&quot;{hoveredItem.item_ingame_description}&quot;</p>
                            </div>
                        </header>
                        <article dangerouslySetInnerHTML={{__html: getDescription()}} className={styles.aside__description}>
                        </article>
                    </div>
                    

    return (
        <aside className={styles.aside}>
            {
                !_.isEmpty(hoveredItem) && infoElem
            }
        </aside>
    )
}