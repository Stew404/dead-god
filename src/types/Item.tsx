export interface ItemWithOptions extends Item {
    isHided?: boolean;
}

export interface BilingualObject {
    en: string;
    ru: string;
}

export interface Icon {
    url: string;
    width: number;
    height: number;
}

type ElementType = "active" | "passive" | "trinket" | "pill" | "card_or_rune" | "pickup" | "environment" | "transformation"

export interface chargesInfo {
    count: string;
    measure: "segment" | "second";
}

export interface OpeningObject {
    text: string;
    achievment: string;
    ending?: string;
    character?: {
        name: string;
        type: "default" | "tainted";
    };
}

export interface Pool {
    id: number;
    name: BilingualObject;
    poolId: string;
}

export interface Tag {
    id: number;
    name: BilingualObject;
    tagId: string;
}

export interface Transformation {
    id: number;
    name: BilingualObject;
    transformationId: string;
}

export interface GameElement {
    uniqueId: number;
    id: number;
    name: BilingualObject;
    ingameDescription: BilingualObject;
    icon: Icon;
    description: string;
    learnMore: string;
    bugs: string;
    type: ElementType;
    opening: OpeningObject;
    keywords: string;
}

export interface Item extends GameElement {
    quality: number;
    activeType?: "default" | "disposable" | "retrievable";
    charges?: chargesInfo;
    isQuest: number;
    bookOfVirtues?: string;
    judasBirthright?: string;
    pools: Pool[];
    tags: Tag[];
    transformations: Transformation[];
}

export interface Trinket extends GameElement {
    tags: Tag[];
    transformations: Transformation[];
}

export interface Pill extends GameElement {
    class: number;
    transformations: Transformation[];
}

export type CardOrRune = GameElement;
export type Pickup = GameElement;
export type Environment = GameElement;
export type TransformationInfo = GameElement;

interface AdditionalTools {
    isHided: boolean
}

export interface AnyElement
    extends Item,
        Trinket,
        CardOrRune,
        Pill,
        Pickup,
        Environment,
        TransformationInfo,
        AdditionalTools {}

export type AnyElementOrEmpty = AnyElement | Record<string, never>;
