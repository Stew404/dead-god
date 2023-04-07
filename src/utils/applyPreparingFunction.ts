import { PrepapingFunction } from "../types/PreparingFunction";

export const applyPreparingFunction = (text: string, preparingFunction: PrepapingFunction)=>{
    return preparingFunction(text)
}