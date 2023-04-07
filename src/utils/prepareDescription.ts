import { applyPreparingFunction } from "./applyPreparingFunction";
import { colorizeText, createParagraphs, replaceItemKeywords } from "./preparingFunctions";

export const prepareDescription = (description: string)=>{

    const preparingFunctions = [
        replaceItemKeywords,
        colorizeText,
        createParagraphs
    ] 

    return preparingFunctions.reduce(applyPreparingFunction, description)
}