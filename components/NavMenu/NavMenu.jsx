const React = require('react')
import { useEffect, useState } from 'react';
import NavItem from '../NavItem/NavItem';

import styles from './NavMenu.module.scss';
import 'remixicon/fonts/remixicon.css';



export default function NavMenu(){

    const [navMenuItems, setNavMenuItems] = useState([]);
    const [navIsOpen, setNavIsOpen] = useState(false);

    useEffect(()=>{
        fetch('https://dead-god.ru/wp-json/myplugin/v1/menu')
        .then(res => res.json())
        .then(items => setNavMenuItems(items));
    },[])

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
                    navMenuItems.map((menuItem, index) => {
                            return <NavItem item={menuItem} key={index}/>
                    })
                }
            </ul>
        </nav>
    )
}