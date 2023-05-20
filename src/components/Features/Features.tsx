import {ItemFeatures} from "@/types/Item";

import styles from "./Features.module.scss"

export default function Features({ features }: {features: ItemFeatures}){
    const {type, opening, charges, activeType, isQuest, pools} = features

    const typeLabels = {
        active: "Активный",
        passive: "Пассивный"
    }

    const activeTypeLabels = {
        default: "",
        retrievable: "Доставаемый",
        disposable: "Одноразовый"
    }

    const typeText = `${typeLabels[type]}${(type === "active" && activeType !== "default") ? ", " + activeTypeLabels[activeType] : ""}${isQuest ? ", Сюжетный" : ""}`

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

    const getChargesText = (charges: ItemFeatures["charges"]) => charges.count === "0"
        ? "Моментальный"
        : `${charges.measure === "second" ? "Пассивный, " : ""}${charges.count} ${chargesMeasureLabel(charges.count, charges.measure)}`
         
    const chargesLi = type === "active" 
        ? <li>Заряд: {getChargesText(charges)}</li>
        : null

    const poolLabels = {
        treasure_room: "Сокровищница",
        shop: "Магазин",
        boss: "Комната Босса",
        library: "Библиотека",
        planetarium: "Планетарий",
        golden_chest: "Золотой сундук",
        red_chest: "Красный сундук",
        old_chest: "Старый сундук",
        beggar: "Попрошайка",
        devil_beggar: "Дьявольский попрошайка",
        key_master: "Мастер ключей",
        bomb_bum: "Бомбовый попрошайка",
        curse_room: "Проклятая комната",
        devil_room: "Комната дьявола",
        angel_room: "Комната ангела",
        secret_room: "Секретная комната",
        ultra_secret_room: "Ультра секретная комната",
        wooden_chest: "Деревянный сундук",
        baby_shop: "Магазин малышей",
        moms_chest: "Мамин сундук",
        battery_bum: "Заряженный попрошайка",
        rotten_beggar: "Гнилой попрошайка",
        crane_game: "Автомат с краном",
        none: "Без пула"
    }

    const poolsArr = Object.values(pools) 

    const poolText = poolsArr.reduce((acc, pool: string, index, arr)=>{
        const isGreed = pool.includes("greed")
        pool = pool.replace("greed_", "")

        return acc + `${poolLabels[pool as keyof object]}${isGreed ? " режима жадности" : ""}${arr.length-1 !== index ? ", " : ""}` 
    }, "")

    const endingLabels = {
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

    const characterLabels = {
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

    const getTaintedText = ({name, type}: {name: string, type: string}) => {
        const femaleCharacters = ["magdalene", "eve", "lilith", "bethany"];

        const adjective = femaleCharacters.includes(name) ? "Порченую" : "Порченого"

        const characterLabel = name !== "jacob_and_esau" ? characterLabels[name as keyof object] : "Якова"
        
        return `${adjective} ${characterLabel}`
    }

    const getOpeningText = (opening: ItemFeatures["opening"]) => {
        
        const openingText = opening.ending === "none" 
            ? `${opening.text}`
            : `Пройти ${endingLabels[opening.ending as keyof object]}
            за
            ${opening.character.type === "tainted" 
            ? getTaintedText(opening.character) 
            : characterLabels[opening.character.name as keyof object]}
            `
        
        return `${openingText} (достижение ${opening.achievment})`

    }

    const openingLi = opening.achievment !== ""
        ? <li>
            <span style={{color: "#F3EC06"}}>Как открыть: {getOpeningText(opening)}</span>
        </li>
        : null

    return (<ul className={styles.list}>
        <li>Тип: {typeText}</li>
        {chargesLi}
        <li>Пул: {poolText}</li>
        {openingLi}
    </ul>)

}