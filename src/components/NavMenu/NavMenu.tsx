import React from "react";
import { useEffect, useState } from "react";
import NavItem from "../NavItem/NavItem";

import styles from "./NavMenu.module.scss";
import "remixicon/fonts/remixicon.css";
import { useAppSelector } from '../../hooks';

export default function NavMenu(){

    const navMenuItems = useAppSelector(state => state.navMenuItems.value)

    const [navIsOpen, setNavIsOpen] = useState(false);

    let navClasses = navIsOpen ? `${styles.nav} ${styles.opened}` : styles.nav;

    function toggleNav(){
        setNavIsOpen(!navIsOpen);
    } 

    return(
        <nav className={navClasses}>
            <button className={styles.navopen} onClick={toggleNav}><i className="ri-menu-line"></i></button>
            <button className={styles.navclose} onClick={toggleNav}><i className="ri-close-line"></i></button>
            <ul className={styles.navlist}>
                { 
                    navMenuItems.map(({title, url}, index) => {
                        return <NavItem title={title} url={url} key={index}/>
                    })
                    
                }
            </ul>
        </nav>
    )
}
