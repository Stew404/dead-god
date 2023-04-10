import { applyPreparingFunction } from "./applyPreparingFunction";
import { colorizeText, createParagraphs } from "./preparingFunctions";

export const prepareDescription = (description: string)=>{

    const preparingFunctions = [
        colorizeText,
        createParagraphs
    ] 

    return preparingFunctions.reduce(applyPreparingFunction, description)
}