import { useAppSelector } from "@/hooks";
import styles from "./MainPanel.module.scss";
import ItemList from "../ItemList/ItemList";
import TrinketList from "../TrinketList/TrinketList";
import ConsumableList from "../ConsumableList/ConsumableList";

export default function MainPanel() {
    const isSettingsOpen = useAppSelector((state) => state.settings.isShowed);

    const mainPanelClassName = isSettingsOpen
        ? `${styles["main-panel"]} ${styles.open}`
        : styles["main-panel"];

    return (
        <main className={mainPanelClassName}>
            <ItemList />
            <TrinketList />
            <ConsumableList />
        </main>
    );
}
