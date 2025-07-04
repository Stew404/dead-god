import { applyPreparingFunction } from "./applyPreparingFunction";
import { colorizeText, createParagraphs, addTooltips } from "./preparingFunctions";

export const prepareDescription = (description: string)=>{

    const preparingFunctions = [
        colorizeText,
        addTooltips,
        createParagraphs
    ] 

    return preparingFunctions.reduce(applyPreparingFunction, description)
}