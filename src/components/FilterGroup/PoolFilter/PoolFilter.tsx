import { useState } from "react";

import styles from "./PoolFilter.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks";
import PoolCheckbox from "./PoolCheckbox";
import { setPoolFilter } from "@/redux/slices/itemsSlice";
import { setGreedMode } from "@/redux/slices/settingsSlice";

export default function PoolFilter() {
    let pools = useAppSelector((state) => state.pools.value);
    const defaultPools = pools.filter((pool) => !pool.poolId.includes("greed"));
    const greedPools = [
        ...pools.filter((pool) => pool.poolId.includes("greed")),
        ...defaultPools.slice(7),
    ];

    const isGreedModeEnabled = useAppSelector(
        (state) => state.settings.isGreedModeEnabled
    );

    const poolIds = pools.map((pool) => pool.poolId);
    const dispatch = useAppDispatch();

    const [checkboxRefs, setCheckboxRefs] = useState<
        React.RefObject<HTMLInputElement>[]
    >([]);

    const selectAll = () => {
        checkboxRefs.map((ref) => {
            if (!ref.current?.checked) {
                ref.current?.click();
            }
        });
        dispatch(setPoolFilter(poolIds));
    };

    const deselectAll = () => {
        checkboxRefs.map((ref) => {
            if (ref.current?.checked) {
                ref.current?.click();
            }
        });
        dispatch(setPoolFilter([]));
    };

    pools = isGreedModeEnabled ? greedPools : defaultPools;

    return (
        <div className={styles["pool-filter"]}>
            <div className={styles["pool-heading"]}>
                Пулы
                <div className={styles["greed-switch"]}>
                    <input
                        type="checkbox"
                        id="greed_switch"
                        onChange={(e) => {
                            deselectAll();
                            dispatch(setGreedMode(e.target.checked));
                        }}
                    />
                    <label htmlFor="greed_switch">Режим Жадности</label>
                </div>
            </div>
            <div className={styles["pool-buttons"]}>
                <button
                    className={styles["pool-button"]}
                    onClick={() => selectAll()}
                >
                    Выбрать все
                </button>
                <button
                    className={styles["pool-button"]}
                    onClick={() => deselectAll()}
                >
                    Убрать все
                </button>
            </div>
            <div className={styles["pool-inputlist"]}>
                {pools.map((poolValue) => {
                    const greedImpossiblePools = [
                        "library",
                        "ultra_secret_room",
                        "planetarium",
                        "moms_chest",
                    ];

                    if (
                        isGreedModeEnabled &&
                        greedImpossiblePools.includes(poolValue.poolId)
                    ) {
                        return (
                            <div
                                className={styles["pool-placeholder"]}
                                id={poolValue.poolId}
                                key={poolValue.poolId}
                            ></div>
                        );
                    }

                    return (
                        <PoolCheckbox
                            key={poolValue.poolId}
                            pool={poolValue}
                            setRef={(ref) => {
                                setCheckboxRefs((state) => [...state, ref]);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
