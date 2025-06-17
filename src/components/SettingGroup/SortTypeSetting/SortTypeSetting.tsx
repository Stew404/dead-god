import styles from "./SortTypeSetting.module.scss";

import { useAppDispatch } from "@/hooks";
import { setSortType } from "@/redux/slices/settingsSlice";

export default function SortTypeSetting() {
    const dispatch = useAppDispatch();

    return (
        <div className={styles["sort-type-setting"]}>
            <p className={styles["sort-type-heading"]}>Сортировка по</p>
            <div className={styles["sort-type-inputlist"]}>
                <label className={styles["sort-type-label"]} htmlFor="sort_0">
                    ID
                    <input
                        type="radio"
                        className={styles["sort-type-input"]}
                        name="sort"
                        value="id"
                        id="sort_0"
                        defaultChecked={true}
                        onChange={(e) => {
                            dispatch(setSortType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["sort-type-label"]} htmlFor="sort_1">
                    Алфавиту
                    <input
                        type="radio"
                        className={styles["sort-type-input"]}
                        name="sort"
                        value="alphabet"
                        id="sort_1"
                        onChange={(e) => {
                            dispatch(setSortType(e.target.value));
                        }}
                    />
                </label>
                <label className={styles["sort-type-label"]} htmlFor="sort_2">
                    Качеству
                    <input
                        type="radio"
                        className={styles["sort-type-input"]}
                        name="sort"
                        value="quality"
                        id="sort_2"
                        onChange={(e) => {
                            dispatch(setSortType(e.target.value));
                        }}
                    />
                </label>
            </div>
        </div>
    );
}
