import { cleanItemTags, colorizeText, createParagraphs } from "./preparingFunctions"
import { applyPreparingFunction } from "./applyPreparingFunction"

export const prepareAsideDescription = (description: string)=>{

    const preparingFunctions = [
        cleanItemTags,
        colorizeText,
        createParagraphs
    ] 

    return preparingFunctions.reduce(applyPreparingFunction, description)
}
