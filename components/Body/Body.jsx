const React = require('react');
const ReactDOM = require('react-dom');

import styles from './Body.module.scss';
import ItemList from '../ItemList/ItemList';
import AsidePanel from '../AsidePanel/AsidePanel';
import { useState } from 'react';

export default function Body({items}){

    const [hoveredItem, setHoveredItem] = useState({});

    return (
        <div className={styles.body}>
            <AsidePanel/>
            <ItemList items={items}/>
        </div>
    )
}