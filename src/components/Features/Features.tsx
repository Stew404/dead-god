import { OpeningObject, Pool, chargesInfo } from "@/types/Item";

import styles from "./Features.module.scss";
import { addTooltips } from "@/utils/preparingFunctions";

import _ from "lodash";
import { AnyElement } from "../../types/Item";

const TYPE_LABELS = {
    active: "Активный предмет",
    passive: "Пассивный предмет",
    trinket: "Брелок",
    card_or_rune: "Карты и Руны",
    pill: "Пилюли",
    pickup: "Пикапы",
    environment: "Окружение",
    transformation: "Трансформация",
};

const ACTIVE_TYPE_LABELS = {
    default: "",
    retrievable: "Доставаемый",
    disposable: "Одноразовый",
};

const ENDING_LABELS = {
    satan: "Сатану",
    blue_baby: "???",
    lamb: "Ламба",
    isaac: "Айзека",
    boss_rush: "Босс Раш",
    hush: "Хаша",
    delirium: "Делириума",
    beast: "Биста",
    mother: "Матерь",
    ultra_greed: "Режим жадности",
    ultra_greedier: "Сложный режим жадности",
    mega_satan: "Мега Сатану",
    four_marks: "Айзека, Сатану, ??? и Ламба",
    two_marks: "Босс Раш и Хаша",
};

const CHARACTER_LABELS = {
    isaac: "Айзека",
    magdalene: "Магдалену",
    cain: "Каина",
    judas: "Иуду",
    bluebaby: "???",
    eve: "Еву",
    samson: "Самсона",
    azazel: "Азазеля",
    lazarus: "Лазаря",
    eden: "Идена",
    lost: "Лоста",
    lilith: "Лилит",
    keeper: "Хранителя",
    apollyon: "Аполлион",
    forgotten: "Забытого",
    bethany: "Бетани",
    jacob_and_esau: "Иакова и Исава",
};

interface ElementFeatures {
    type: AnyElement["type"];
    opening: AnyElement["opening"];
    charges: AnyElement["charges"];
    activeType: AnyElement["activeType"];
    isQuest: AnyElement["isQuest"];
    pools: AnyElement["pools"];
};

export default function Features({
    features: { type, opening, charges, activeType, isQuest, pools },
}: {
    features: ElementFeatures;
}) {
    const isDefaultActiveType =
        type === "active" && activeType === "default";

    const typeLabel = TYPE_LABELS[type]
    const activeTypeLabel = activeType && !isDefaultActiveType ? ", " + ACTIVE_TYPE_LABELS[activeType] : ""
    const questLabel = isQuest ? ", Сюжетный" : ""

    const typeText = `${typeLabel}${activeTypeLabel}${questLabel}`;

    function chargesMeasureLabel(count: string, measure: "second" | "segment") {
        const measureMap = {
            segment: ["деление", "деления", "делений"],
            second: ["секунда", "секунды", "секунд"],
        };

        switch (parseInt(count) % 10) {
            case 1:
                return measureMap[measure][0];
            case 2:
            case 3:
            case 4:
                return measureMap[measure][1];
            default:
                return measureMap[measure][2];
        }
    }

    const getChargesText = ({ count, measure }: chargesInfo) => {
        return count === "0"
            ? "Моментальный"
            : `${
                  measure === "second" ? "Пассивный, " : ""
              }${count} ${chargesMeasureLabel(count, measure)}`;
    };

   
    const chargesList =
    charges && type === "active" ? <li>Заряд: {getChargesText(charges)}</li> : null;
    

    let poolList = null;
    if (pools) {
        poolList = pools.reduce((acc: string, pool: Pool, index, arr) => {
            const isGreed = pool.poolId.includes("greed");

            return (
                acc +
                `${pool.name.ru}${isGreed ? " режима жадности" : ""}${
                    arr.length - 1 !== index ? ", " : ""
                }`
            );
        }, "");

        poolList = <li>Пул: {poolList}</li>;
    }

    const getTaintedText = (name: string) => {
        const femaleCharacters = ["magdalene", "eve", "lilith", "bethany"];

        const adjective = femaleCharacters.includes(name)
            ? "Порченую"
            : "Порченого";

        const characterLabel =
            name !== "jacob_and_esau"
                ? CHARACTER_LABELS[name as keyof object]
                : "Якова";

        return `${adjective} ${characterLabel}`;
    };

    const getOpeningText = ({
        text,
        ending,
        character,
        achievment,
    }: OpeningObject) => {
        const openingText =
            ending === "none" || !ending
                ? `${text}`
                : `Пройти ${ENDING_LABELS[ending as keyof object]} за
                ${
                    character?.type === "tainted"
                        ? getTaintedText(character.name)
                        : CHARACTER_LABELS[character?.name as keyof object]
                }
            `;

        return addTooltips(`${openingText} (достижение ${achievment})`);
    };

    const openingList =
        opening && opening.achievment && opening.achievment !== "" ? (
            <li style={{ display: "flex" }}>
                <span style={{ color: "#F3EC06", marginRight: "0.2em" }}>
                    Как открыть:
                </span>
                <p
                    dangerouslySetInnerHTML={{
                        __html: getOpeningText(opening),
                    }}
                ></p>
            </li>
        ) : null;

    return (
        <ul className={styles.list}>
            <li>Тип: {typeText}</li>
            {chargesList}
            {poolList}
            {openingList}
        </ul>
    );
}
