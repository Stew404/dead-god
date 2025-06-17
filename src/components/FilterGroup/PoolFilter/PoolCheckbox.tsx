import { Pool } from "@/types/Item";
import styles from "./PoolFilter.module.scss";
import { useEffect, useRef } from "react";
import { useFilter } from "@/hooks/useFilter";
import { useCurrentLanguageName } from "@/hooks/useCurrentLanguageName";

export default function PoolCheckbox({
    pool,
    setRef,
}: {
    pool: Pool;
    setRef: (ref: React.RefObject<HTMLInputElement>) => void;
}) {
    const onFiltersChange = useFilter();

    const poolId = pool.poolId;

    const checkboxRef = useRef(null);

    useEffect(() => {
        setRef(checkboxRef);
    }, []);

    const name = useCurrentLanguageName(pool.name);

    return (
        <>
            <input
                className={styles["pool-input"]}
                type="checkbox"
                name="pool"
                id={`pool-${poolId}`}
                value={poolId}
                onChange={(e) => {
                    onFiltersChange({
                        value: e.target.value,
                        key: "pool",
                        checked: e.target.checked,
                    });
                }}
                ref={checkboxRef}
            />
            <label
                className={styles["pool-label"]}
                htmlFor={`pool-${poolId}`}
                id={styles[poolId]}
            >
                {name}
            </label>
        </>
    );
}
