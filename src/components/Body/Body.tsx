import React from "react";

import styles from "./Body.module.scss";

import ItemList from "../ItemList/ItemList";
import AsidePanel from "../AsidePanel/AsidePanel";
import ItemInfo from "../ItemInfo/ItemInfo";

import { useState,useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";

import Modal from "react-modal";
// import Tooltip from "@huner2/react-tooltip";

import { close as closeModal } from "@/redux/slices/modalSlice";
import { clear as clearModalItem } from "@/redux/slices/modalItemSlice";


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
    const dispatch = useAppDispatch();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const modalItem = useAppSelector((state) => state.modalItem.value);
    const modal = useAppSelector((state) => state.modal.value);

    return (
        <div className={styles.body}>
            <AsidePanel />
            <ItemList />
            <Modal
                isOpen={modal}
                style={modalStyle}
                closeTimeoutMS={200}
                // onAfterOpen={() => {
                //     Tooltip.rebuild();
                // }}
                onRequestClose={() => {
                    dispatch(closeModal());
                }}
                onAfterClose={() => {
                    dispatch(clearModalItem());
                }}
            >
                <ItemInfo item={modalItem}></ItemInfo>
            </Modal>
        {/* 
            {isMounted && (
                <Tooltip
                    place="bottom"
                    class="tooltip"
                    offset={{ bottom: 5 }}
                    effect="solid"
                ></Tooltip>
            )} */}
        </div>
    );
}
