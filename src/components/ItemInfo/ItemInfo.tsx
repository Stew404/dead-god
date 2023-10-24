import ItemDescription from "../ItemDescription/ItemDescription";

import styles from "./ItemInfo.module.scss";

import { ItemOrEmpty, AdditionalItemInformation } from "../../types/Item";

import ItemImage from "../ItemImage/ItemImage";

import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "../AccordionItem/AccordionItem";
import { replaceItemKeywords } from "../ItemDescription/ItemDescription";
import { prepareAdditionalInfo } from "@/utils/prepapeAdditionalInfo";
import Transformations from "../Transformations/Transformations";
import Features from "../Features/Features";

interface accordionHeaders {
    [name: string]: {
        text: string,
        color: string
    }
}

const accordionHeaders: accordionHeaders = {
    learnMore: {
        text: "Узнать больше",
        color: "#f2ecde"
    },
    bugs: {
        text: "Баги",
        color: "#da0707"
    },
    bookOfVirtues: {
        text: "Огонёк Книги Добродетелей",
        color: "#abc7f3"
    },
    judasBirthright: {
        text: "Право Первородства Иуды",
        color: "#d8c1a9"
    }
}
export default function ItemInfo({ item }: {item: ItemOrEmpty}) {

    console.log(item)

    const accordion = Object.entries(accordionHeaders)

    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.id}>ID: {item.id}</p>
                    <p className={styles.quality}>Качество: {item.quality}</p>
                </div>
                <div>
                    <h3 className={styles.title}>{item.name.en}</h3>
                    <p className={styles["ingame-description"]}>
                        &quot;{item.ingameDescription.en}&quot;
                    </p>
                </div>
                <div>
                    <ItemImage itemIcon={item.icon} itemName={item.name} scale={1}/>
                </div>
            </header>
            <ItemDescription description={item.description} />
            
            <Transformations transformations={item.transformations}/>

            <Accordion allowMultiple transition transitionTimeout={300}>
                { 
                    accordion.map(([accordionItemId, headerInfo])=>{

                        let accordionItemContent = item[accordionItemId as keyof AdditionalItemInformation]

                        if (!accordionItemContent){
                            return
                        }

                        const headerStyle = {
                            color: headerInfo.color,
                            fontWeight: "400",
                        }

                        const header = <h4 className={styles['accordion-header']} style={headerStyle}>{headerInfo.text}</h4>

                        accordionItemContent = prepareAdditionalInfo(accordionItemContent)

                        return <AccordionItem header={header} key={accordionItemId}>
                            {replaceItemKeywords(accordionItemContent)} 
                        </AccordionItem>

                    })
                }
            </Accordion>

            <Features features={{
                type: item.type,
                opening: item.opening,
                activeType: item.activeType,
                charges: item.charges,
                isQuest: item.isQuest, 
                pools: item.pools
            }}/>
        </>
    );
}
