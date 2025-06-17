import styles from "./NamesLanguageSetting.module.scss";

import { useAppDispatch } from "@/hooks";
import { setNamesLanguage } from "@/redux/slices/settingsSlice";

export default function NamesLanguageSetting() {
    const dispatch = useAppDispatch();

    return (
        <div className={styles["names-language-setting"]}>
            <p className={styles["names-language-heading"]}>
                Названия Предметов
            </p>
            <div className={styles["names-language-inputlist"]}>
                <label
                    className={styles["names-language-label"]}
                    htmlFor="lang_0"
                >
                    Оригинал
                    <input
                        type="radio"
                        className={styles["names-language-input"]}
                        name="lang"
                        value="en"
                        id="lang_0"
                        defaultChecked={true}
                        onChange={(e) => {
                            dispatch(setNamesLanguage(e.target.value));
                        }}
                    />
                </label>
                <label
                    className={styles["names-language-label"]}
                    htmlFor="lang_1"
                >
                    Перевод
                    <input
                        type="radio"
                        className={styles["names-language-input"]}
                        name="lang"
                        value="ru"
                        id="lang_1"
                        onChange={(e) => {
                            dispatch(setNamesLanguage(e.target.value));
                        }}
                    />
                </label>
            </div>
        </div>
    );
}
