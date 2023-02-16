const React = require("react");
const ReactDOM = require("react-dom");

import styles from "./Body.module.scss";
import ItemList from "../ItemList/ItemList";
import AsidePanel from "../AsidePanel/AsidePanel";
import ItemInfo from "../ItemInfo/ItemInfo";

import { useSelector, useDispatch } from "react-redux";

import Modal from "react-modal";
import Tooltip from "@huner2/react-tooltip";

import { close } from "../../features/modal/modalSlice";
import { clear as clearSelectedItem } from "../../features/selectedItem/selectedItemSlice";
import { useState } from "react";
import { useEffect } from "react";

Modal.setAppElement("#modal");

const modalStyle = {
    overlay: {
        backgroundColor: "rgb(0, 0, 0, .6)",
    },
    content: {
        backgroundColor: "#464646",
        maxWidth: "1200px",
        width: "90vw",
        maxHeight: "80vh",
        height: "auto",
        padding: "20px 30px",
        border: "none",
        borderRadius: "0",
        top: "10%",
        bottom: "auto",
        left: "50%",
        transform: "translateX(-50%)",
    },
};

export default function Body() {
    const dispatch = useDispatch();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const selectedItem = useSelector((state) => state.selectedItem.value);
    const modal = useSelector((state) => state.modal.value);

    return (
        <div className={styles.body}>
            <AsidePanel />
            <ItemList />
            <Modal
                isOpen={modal}
                style={modalStyle}
                closeTimeoutMS={200}
                onAfterOpen={() => {
                    Tooltip.rebuild();
                }}
                onRequestClose={() => {
                    dispatch(close());
                }}
                onAfterClose={() => {
                    dispatch(clearSelectedItem());
                }}
            >
                <ItemInfo itemData={selectedItem}></ItemInfo>
            </Modal>
            {isMounted && (
                <Tooltip
                    place="bottom"
                    class="tooltip"
                    offset={{ bottom: 5 }}
                    effect="solid"
                ></Tooltip>
            )}
        </div>
    );
}
