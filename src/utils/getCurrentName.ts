import store from "@/redux/store";
import { BilingualObject } from "@/types/Item";

export const getCurrentName = (nameObj: BilingualObject) => {
    const curStore = store.getState();
    const currentLanguage = curStore.settings.namesLanguage;
    return nameObj[currentLanguage as keyof BilingualObject];
};