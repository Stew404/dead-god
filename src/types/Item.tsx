export interface Pool {
    id: number,
    poolId: string,
    name : {
        ru: string,
        en: string
    }
}

export interface Transformation {
    id: number,
    transformationId: string,
    name: {
        en: string,
        ru: string
    }
}

export type Quality = 0 | 1 | 2 | 3 | 4;

export interface Item extends ItemFeatures, AdditionalItemInformation{
    name: {
        en: string,
        ru: string
    },
    ingameDescription: {
        en: string,
        ru: string
    },
    id: number,
    quality: Quality,
    icon: {
        url: string,
        width: number,
        height: number
    },
    description: string,
    transformations: Transformation[],
    tags: object,
    keywords: string
}

export interface AdditionalItemInformation {
    bugs: string,
    learnMore: string,
    bookOfVirtuesWisp: string,
    judasBirthrightEffect: string,
}

export interface ItemFeatures {
    type: "active" | "passive",
    opening: {
        text: string,
        ending: string,
        character: {
            name: string,
            type: "default" | "tainted",
        }
        achievment: string
    },
    activeType: "default" | "retrievable" | "disposable"
    charges: {
        count: string,
        measure: "segment" | "second"
    }
    isQuest: boolean
    pools : Pool[]
}

export type ItemOrEmpty = Item | Record<string, never>

export interface HidedItem {
    name: {
        en: string,
        ru: string
    },
    icon: {
        url: string,
        width: number,
        height: number
    }
}
