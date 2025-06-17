import ItemDescription from "../ItemDescription/ItemDescription";

import styles from "./ElementInfo.module.scss";

import { AnyElement } from "../../types/Item";

import ElementImage from "../ElementImage/ElementImage";

import { Accordion } from "@szhsin/react-accordion";
import AccordionItem from "../AccordionItem/AccordionItem";
import { replaceItemKeywords } from "../ItemDescription/ItemDescription";
import { prepareAdditionalInfo } from "@/utils/prepapeAdditionalInfo";
import Transformations from "../Transformations/Transformations";
import Features from "../Features/Features";
import { getCurrentName } from "@/utils/getCurrentName";
import { colorizeText } from "@/utils/preparingFunctions";

interface header {
    elementProperty: keyof AnyElement;
    text: string;
    color: string;
};

type headerKeys = "learnMore" | "bugs" | "bookOfVirtues" | "judasBirthright";

const accordionHeaders: header[] = [
    {
        elementProperty: "learnMore",
        text: "Узнать больше",
        color: "#f2ecde",
    },
    {
        elementProperty: "bugs",
        text: "Баги",
        color: "#da0707",
    },
    {
        elementProperty: "bookOfVirtues",
        text: "Огонёк Книги Добродетелей",
        color: "#abc7f3",
    },
    {
        elementProperty: "judasBirthright",
        text: "Право Первородства Иуды",
        color: "#d8c1a9",
    },
]

export default function ElementInfo({
    element,
}: {
    element: AnyElement;
}) {
    const accordion = accordionHeaders;
    const name = getCurrentName(element.name);
    let ingameDescription = getCurrentName(element.ingameDescription);
    ingameDescription = colorizeText(ingameDescription);

    let qualityInfo = "";

    if ("quality" in element) {
        qualityInfo = `Качество: ${element.quality}`;
    }
    
    if ("class" in element) {
        qualityInfo = `Класс: ${element.class}`;
    }
    
    console.log(element.icon);
    return (
        <>
            <header className={styles.header}>
                <div>
                    <p className={styles.id}>ID: {element.id}</p>
                    <p className={styles.quality}>{qualityInfo}</p>
                </div>
                <div>
                    <h3 className={styles.title}>{name}</h3>
                    <p
                        className={styles["ingame-description"]}
                        dangerouslySetInnerHTML={{ __html: ingameDescription }}
                    ></p>
                </div>
                <div>
                    <ElementImage
                        elementIcon={element.icon}
                        elementName={element.name}
                        scale={1}
                    />
                </div>
            </header>
            <ItemDescription description={element.description} />

            {"transformations" in element && (
                <Transformations transformations={element.transformations} />
            )}

            <Accordion allowMultiple transition transitionTimeout={300}>
                {accordion.map((accordionHeader) => {

                    let accordionItemContent =
                        element[accordionHeader.elementProperty as headerKeys];
                        ;

                    if (!accordionItemContent) {
                        return;
                    }

                    const headerStyle = {
                        color: accordionHeader.color,
                        fontWeight: "400",
                    };

                    const header = (
                        <h4
                            className={styles["accordion-header"]}
                            style={headerStyle}
                        >
                            {accordionHeader.text}
                        </h4>
                    );

                    accordionItemContent =
                        prepareAdditionalInfo(accordionItemContent);

                    return (
                        <AccordionItem
                            header={header}
                            key={accordionHeader.elementProperty}
                        >
                            {replaceItemKeywords(accordionItemContent)}
                        </AccordionItem>
                    );
                })}
            </Accordion>

            <Features
                features={{
                    type: element.type,
                    opening: element.opening,
                    activeType: element.activeType,
                    charges: element.charges,
                    isQuest: element.isQuest,
                    pools: element.pools,
                }}
            />
        </>
    );
}
