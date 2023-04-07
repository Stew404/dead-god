import React from "react";

import { MenuItem } from "@/types/NavMenu"
import styles from "./NavItem.module.scss"

export default function NavItem({title, url}: MenuItem){
    return(
        <li className={styles.navitem}>
            <a className={styles.navlink} href={url}>{title}</a>
        </li>
    )
}