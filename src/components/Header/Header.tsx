import React, { ChangeEvent, useRef } from "react";

import styles from "./Header.module.scss";

import NavMenu from "@/components/NavMenu/NavMenu";
import { useAppDispatch } from "@/hooks";
import { toggleShowing as toggle } from "@/redux/slices/settingsSlice";
import { setSearchString } from "@/redux/slices/itemsSlice";

export default function Header() {
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const searchInputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchString(e.target.value));
    };

    const clearButtonClickHandle = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        dispatch(setSearchString(""));
    };

    return (
        <header className={styles.header}>
            <NavMenu />
            <label className={styles["search-field"]} htmlFor="search-input">
                <input
                    ref={inputRef}
                    type="text"
                    onChange={searchInputChangeHandle}
                    placeholder="Введите запрос"
                    id="search-input"
                />
                <button
                    className={styles["search-clear-button"]}
                    data-tooltip-content="Очистить"
                    data-tooltip-id="modal-tooltip"
                    data-tooltip-place="bottom"
                    data-tooltip-float={false}
                    onClick={clearButtonClickHandle}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                    </svg>
                </button>
            </label>
            <button
                className={styles["settings-button"]}
                onClick={() => {
                    dispatch(toggle());
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
            </button>
        </header>
    );
}
