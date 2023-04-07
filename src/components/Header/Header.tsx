import React from 'react'

import styles from './Header.module.scss'

import NavMenu from '@/components/NavMenu/NavMenu';

export default function Header(){
    return (
        <header className={styles.header}>
            <NavMenu/>
        </header>
    )
}