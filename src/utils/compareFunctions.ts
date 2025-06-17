import { AnyElement } from "@/types/Item";

export function sortByItemId(itemA: AnyElement, itemB: AnyElement){
    return itemA.id - itemB.id
}

export function sortByAlphabet(itemA: AnyElement, itemB: AnyElement){
    
    return itemA.name.en.localeCompare(itemB.name.en);
}

export function sortByItemQuality(itemA: AnyElement, itemB: AnyElement){
    return itemB.quality - itemA.quality
    // TODO: this sort looks different is some cases. It depends from previous sort which were used 
}