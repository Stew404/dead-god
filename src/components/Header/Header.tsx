import React from 'react'

import styles from './Header.module.scss'

import NavMenu from '@/components/NavMenu/NavMenu';
import { useAppDispatch } from '@/hooks';
import { toggle } from '@/redux/slices/settingsSlice';

export default function Header(){

    const dispatch = useAppDispatch()

    return (
        <header className={styles.header}>
            <NavMenu/>
            <button onClick={()=>{
                dispatch(toggle())
            }}>settings btn</button>
        </header>
    )
}