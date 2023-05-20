import { applyPreparingFunction } from "./applyPreparingFunction";
import { colorizeText, addTooltips, createAdditionalInfoParagraphs } from "./preparingFunctions";

export const prepareAdditionalInfo = (description: string)=>{

    const preparingFunctions = [
        colorizeText,
        addTooltips,
        createAdditionalInfoParagraphs
    ] 

    return preparingFunctions.reduce(applyPreparingFunction, description)
}