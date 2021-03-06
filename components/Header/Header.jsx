const React = require('react')

import styles from './Header.module.scss'

import NavMenu from '../NavMenu/NavMenu';

export default function Header(){
    return (
        <header className={styles.header}>
            <NavMenu/>
        </header>
    )
}