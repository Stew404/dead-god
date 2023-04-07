import exp from "constants"

interface Transformation {
    id: number,
    transformationId: string,
    name: {
        en: string,
        ru: string
    }
}

export interface Item {
    name: {
        en: string,
        ru: string
    },
    ingameDescription: {
        en: string,
        ru: string
    },
    id: number,
    quality: number,
    icon: {
        url: string,
        width: number,
        height: number
    },
    description: string,
    type: string
    opening: {        
        text: string,
        ending: string,
        character: {
            name: string,
            type: string
        },
        achievment: number
    }
    activeType: object,
    charges: {
        measure: string,
        count: number
    },
    isQuest: boolean,
    pools: object,
    bugs: string,
    synergies: string,
    bookOfVirtuesWisp: string,
    judasBirthrightEffect: string,
    transformations: Transformation[],
    tags: object,
    keywords: string
}

export type ItemOrEmpty = Item | Record<string, never>

interface PostMeta {
    icon_width: string,
    icon_height: string
}

export interface ItemData {
    acf: Item,
    post_meta: PostMeta
}
