import {ItemFeatures, Pool} from "@/types/Item";

import styles from "./Features.module.scss"
import { addTooltips } from "@/utils/preparingFunctions";

// const POOL_LABELS = {
//         treasure_room: "Сокровищница",
//         shop: "Магазин",
//         boss: "Комната Босса",
//         library: "Библиотека",
//         planetarium: "Планетарий",
//         golden_chest: "Золотой сундук",
//         red_chest: "Красный сундук",
//         old_chest: "Старый сундук",
//         beggar: "Попрошайка",
//         devil_beggar: "Дьявольский попрошайка",
//         key_master: "Мастер ключей",
//         bomb_bum: "Бомбовый попрошайка",
//         curse_room: "Проклятая комната",
//         devil_room: "Комната дьявола",
//         angel_room: "Комната ангела",
//         secret_room: "Секретная комната",
//         ultra_secret_room: "Ультра секретная комната",
//         wooden_chest: "Деревянный сундук",
//         baby_shop: "Магазин малышей",
//         moms_chest: "Мамин сундук",
//         battery_bum: "Заряженный попрошайка",
//         rotten_beggar: "Гнилой попрошайка",
//         crane_game: "Автомат с краном",
//         none: "Без пула"
//     }

const TYPE_LABELS = {
    active: "Активный",
    passive: "Пассивный"
}

const ACTIVE_TYPE_LABELS = {
    default: "",
    retrievable: "Доставаемый",
    disposable: "Одноразовый"
}

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
    two_marks: "Босс Раш и Хаша"
}

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
    lilith: "Лазаря", 
    keeper: "Хранителя",
    apollyon: "Аполлион",
    forgotten: "Забытого",
    bethany: "Бетани",
    jacob_and_esau: "Иакова и Исава"
}

export default function Features({ features: {type, opening, charges, activeType, isQuest, pools}} : {features: ItemFeatures}){

    const isNotDefaultActiveType = type === "active" && activeType !== "default"

    const typeText = `${TYPE_LABELS[type]}${isNotDefaultActiveType ? ", " + ACTIVE_TYPE_LABELS[activeType] : ""}${isQuest ? ", Сюжетный" : ""}`

    function chargesMeasureLabel(count: string, measure: "second" | "segment"){
        const measureMap = {
            segment: ["деление", "деления", "делений"],
            second: ["секунда", "секунды", "секунд"]
        }

        switch(parseInt(count) % 10){
            case 1:
                return measureMap[measure][0]
            case 2:
            case 3:
            case 4:
                return measureMap[measure][1]
            default:
                return measureMap[measure][2]
        }
    }

    const getChargesText = ({count, measure}: ItemFeatures["charges"]) => {
        return count === "0"
            ? "Моментальный"
            : `${measure === "second" ? "Пассивный, " : ""}${count} ${chargesMeasureLabel(count, measure)}`
    }

    const chargesList = type === "active" 
        ? <li>Заряд: {getChargesText(charges)}</li>
        : null


    const poolText = pools.reduce((acc: string, pool: Pool, index, arr)=>{
        const isGreed = pool.poolId.includes("greed")

        return acc + `${pool.name.ru}${isGreed ? " режима жадности" : ""}${arr.length-1 !== index ? ", " : ""}` 
    }, "")

    const getTaintedText = (name: string) => {
        const femaleCharacters = ["magdalene", "eve", "lilith", "bethany"];

        const adjective = femaleCharacters.includes(name) ? "Порченую" : "Порченого"

        const characterLabel = name !== "jacob_and_esau" ? CHARACTER_LABELS[name as keyof object] : "Якова"
        
        return `${adjective} ${characterLabel}`
    }

    const getOpeningText = ({text, ending, character, achievment}: ItemFeatures["opening"]) => {
        
        const openingText = ending === "none" || !ending
            ? `${text}`
            : `Пройти ${ENDING_LABELS[ending as keyof object]} за
                ${
                character.type === "tainted" 
                    ? getTaintedText(character.name) 
                    : CHARACTER_LABELS[character.name as keyof object]
                }
            `
        
        return addTooltips(`${openingText} (достижение ${achievment})`)

    }

    const openingList = opening.achievment !== ""
        ? <li style={{display: "flex"}}>
            <span style={{color: "#F3EC06", marginRight: "0.2em"}}>Как открыть:</span> 
            <p dangerouslySetInnerHTML={{__html: getOpeningText(opening)}}></p>
        </li>
        : null

    return (<ul className={styles.list}>
        <li>Тип: {typeText}</li>
        {chargesList}
        <li>Пул: {poolText}</li>
        {openingList}
    </ul>)

}