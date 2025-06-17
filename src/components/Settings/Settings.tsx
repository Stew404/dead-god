import styles from "./Settings.module.scss";

import { useAppSelector } from "@/hooks";
import QualityFilter from "../FilterGroup/QualityFilter/QualityFilter";
import PoolFilter from "../FilterGroup/PoolFilter/PoolFilter";
import TagFilter from "../FilterGroup/TagFilter/TagFilter";
import HideTypeSetting from "../SettingGroup/HideTypeSetting/HideTypeSetting";
import SortTypeSetting from "../SettingGroup/SortTypeSetting/SortTypeSetting";
import NamesLanguageSetting from "../SettingGroup/NamesLanguageSetting/NamesLanguageSetting";
import GroupTypeSetting from "../SettingGroup/GroupTypeSetting/GroupTypeSetting";

export default function Settings() {
    const isSettingsOpened = useAppSelector((state) => state.settings.isShowed);

    let settingsStyle = isSettingsOpened
        ? `${styles.settings} ${styles.settings_opened}`
        : styles.settings;

    return (
        <div className={settingsStyle}>
            {isSettingsOpened && (
                <>
                    <div className={styles["settings__row"]}>
                        <GroupTypeSetting />
                        <SortTypeSetting />
                        <NamesLanguageSetting />
                        <HideTypeSetting />
                        <QualityFilter />
                    </div>
                    <PoolFilter />
                    <TagFilter />
                </>
            )}
        </div>
    );
}
