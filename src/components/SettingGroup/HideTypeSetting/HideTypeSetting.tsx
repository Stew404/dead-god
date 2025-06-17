import { useAppDispatch } from "@/hooks";
import styles from "./HideTypeSetting.module.scss";

import { setHideType } from "@/redux/slices/settingsSlice";

export default function HideTypeSetting() {
    const dispatch = useAppDispatch();

    return (
        <div className={styles["hide-type-setting"]}>
            <p className={styles["hide-type-heading"]}>Стиль фильтра</p>
            <div className={styles["hide-type-inputlist"]}>
                <label className={styles["hide-type-label"]} htmlFor="hide_0">
                    Тускнеющий
                    <input
                        type="radio"
                        className={styles["hide-type-input"]}
                        name="hide"
                        value="fade"
                        id="hide_0"
                        defaultChecked={true}
                        onChange={(e) => {
                            dispatch(setHideType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["hide-type-label"]} htmlFor="hide_1">
                    Скрывающий
                    <input
                        type="radio"
                        className={styles["hide-type-input"]}
                        name="hide"
                        value="hide"
                        id="hide_1"
                        onChange={(e) => {
                            dispatch(setHideType(e.target.value));
                        }}
                    />
                </label>
            </div>
        </div>
    );
}
