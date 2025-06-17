import { useFilter } from "@/hooks/useFilter";
import styles from "./QualityFilter.module.scss";
import { Fragment } from "react";

export default function QualityFilter() {
    const onFiltersChange = useFilter();

    const qualityValues = [0, 1, 2, 3, 4];

    return (
        <div className={styles["quality-filter"]}>
            <p className={styles["quality-heading"]}>Качество</p>
            <div className={styles["quality-inputlist"]}>
                {qualityValues.map((qualityValue) => {
                    return (
                        <Fragment key={qualityValue}>
                            <input
                                className={styles["quality-input"]}
                                type="checkbox"
                                name="quality"
                                id={`quality-${qualityValue}`}
                                value={qualityValue}
                                onChange={(e) => {
                                    onFiltersChange({
                                        value: parseInt(e.target.value),
                                        key: "quality",
                                        checked: e.target.checked,
                                    });
                                }}
                            />
                            <label
                                className={styles["quality-label"]}
                                htmlFor={`quality-${qualityValue}`}
                            >
                                {qualityValue}
                            </label>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
