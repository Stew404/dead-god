const React = require('react')

import styles from './NavItem.module.scss'

export default function NavItem(props){
    return(
        <li className={styles.navitem}>
            <a className={styles.navlink} href={props.item.url}>{props.item.title}</a>
        </li>
    )
}