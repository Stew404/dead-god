import React from "react";

import styles from "./Body.module.scss";

import ItemList from "../ItemList/ItemList";
import AsidePanel from "../AsidePanel/AsidePanel";
import ItemInfo from "../ItemInfo/ItemInfo";

import { useAppDispatch, useAppSelector } from "@/hooks";

import Modal from "react-modal";
import {Tooltip} from "react-tooltip"

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
                onRequestClose={() => {
                    dispatch(closeModal());
                }}
                onAfterClose={() => {
                    dispatch(clearModalItem());
                }}
            >
                <ItemInfo item={modalItem}></ItemInfo>
            </Modal>
            
            <Tooltip className={styles.tooltip} id="modal-tooltip" place="bottom" float={true} noArrow={true} positionStrategy="absolute"/>
        </div>
    );
}
