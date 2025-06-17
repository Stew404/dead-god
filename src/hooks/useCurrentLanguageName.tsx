import { useAppSelector } from "@/hooks";
import { BilingualObject } from "@/types/Item";

export const useCurrentLanguageName = (nameObj: BilingualObject | undefined) => {
    const currentLanguage = useAppSelector(
        (state) => state.settings.namesLanguage
    );

    if (!nameObj) {
        return null;
    }
    return nameObj[currentLanguage as keyof BilingualObject];
};
