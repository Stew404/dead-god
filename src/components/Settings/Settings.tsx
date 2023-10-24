import styles from "./Settings.module.scss"

import { useAppSelector } from "@/hooks"
import { useFilter } from "@/hooks/useFilter"
import QualityFilter from "../FilterGroup/QualityFilter/QualityFilter";

interface FilterUpdatePayload {
    value: string | number,
    key: string,
    checked: boolean
}

export default function Settings(){

    const isSettingsOpened = useAppSelector((state)=> state.settings.value)

    let settingsStyle = isSettingsOpened ? `${styles.settings} ${styles.settings_opened}` : styles.settings

    

    return (
        <div className={settingsStyle}>
            <QualityFilter/>
        </div>
    )
}