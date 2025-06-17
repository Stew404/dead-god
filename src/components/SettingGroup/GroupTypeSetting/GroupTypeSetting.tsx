import styles from "./GroupTypeSetting.module.scss";

import { useAppDispatch } from "@/hooks";
import { setGroupType } from "@/redux/slices/settingsSlice";

export default function GroupTypeSetting() {
    const dispatch = useAppDispatch();

    return (
        <div className={styles["group-type-setting"]}>
            <p className={styles["group-type-heading"]}>Группировать по</p>
            <div className={styles["group-type-inputlist"]}>
                <label className={styles["group-type-label"]} htmlFor="group_0">
                    Категории
                    <input
                        type="radio"
                        className={styles["group-type-input"]}
                        name="group"
                        value="category"
                        id="group_0"
                        defaultChecked={true}
                        onChange={(e) => {
                            dispatch(setGroupType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["group-type-label"]} htmlFor="group_1">
                    Коллекции
                    <input
                        type="radio"
                        className={styles["group-type-input"]}
                        name="group"
                        value="collection"
                        id="group_1"
                        onChange={(e) => {
                            dispatch(setGroupType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["group-type-label"]} htmlFor="group_2">
                    Пулу
                    <input
                        type="radio"
                        className={styles["group-type-input"]}
                        name="group"
                        value="pool"
                        id="group_2"
                        onChange={(e) => {
                            dispatch(setGroupType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["group-type-label"]} htmlFor="group_3">
                    Превращению
                    <input
                        type="radio"
                        className={styles["group-type-input"]}
                        name="group"
                        value="transformation"
                        id="group_3"
                        onChange={(e) => {
                            dispatch(setGroupType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["group-type-label"]} htmlFor="group_4">
                    Достижению
                    <input
                        type="radio"
                        className={styles["group-type-input"]}
                        name="group"
                        value="achievment"
                        id="group_4"
                        onChange={(e) => {
                            dispatch(setGroupType(e.target.value));
                        }}
                    />
                </label>
            </div>
        </div>
    );
}
