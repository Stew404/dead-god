const React = require('react');
const ReactDOM = require('react-dom');

import { useEffect, useState } from 'react';
import styles from './ItemList.module.scss';

import Item from '../Item/Item';

export default function ItemList({items}){

    return(
        <main className={styles.items}>
            {
            items.map((item, index)=>{
                console.log(item)
                return <Item itemData={item} key={index}/>
            })
            }

        </main>
    )
}