const React = require('react');

import { useDispatch } from "react-redux";
import {add, clear} from "../../features/hoveredItem/hoveredItemSlice"

import Image from "next/image"
import styles from "./Item.module.scss"

export default function Item({itemData}){

    const dispatch = useDispatch()
    
    let iconWidth = itemData.icon_width
    let iconHeight = itemData.icon_height

    let wrapperStyle = {
        width: `${iconWidth}px`,
        height: `${iconHeight}px`
    }

    let imgStyle = {
        imageRendering: "pixelated"
    }

    const mouseOverHandler = ()=>{
        dispatch(add(itemData))
    }

    const mouseOutHandler = ()=>{
        dispatch(clear())
    }
    return(
        <div className={styles.item} style={wrapperStyle} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
            <Image width={iconWidth} height={iconHeight} style={imgStyle} src={itemData.item_icon} alt="" />
        </div>
    )
}