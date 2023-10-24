import React from "react";

import { useAppDispatch } from "@/hooks";
import {
  set as setHoveredItem,
  clear as clearHoveredItem,
} from "@/redux/slices/hoveredItemSlice";
import { set as setModalItem } from "@/redux/slices/modalItemSlice";
import { open as openModal} from "@/redux/slices/modalSlice";

import Image from "next/image";
import styles from "./Item.module.scss";
import type { Item, HidedItem } from "../../types/Item";

export default function Item({ item }: {item: Item | HidedItem}) {
  const dispatch = useAppDispatch();

  const iconWidth = item.icon.width*0.7;
  const iconHeight = item.icon.height*0.7;

  let wrapperStyle = {
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };

  const renderContent = ()=>{

    if(!("id" in item)){
      return <div
        className={styles.item}
        style={{
          ...wrapperStyle,
          opacity: ".1"
        }}
      >
        <Image
          className={styles.img}
          src={item.icon.url}
          alt={item.name.en}
          width={iconWidth}
          height={iconHeight}
        />
      </div>
    }

    const mouseOverHandler = () => {
      dispatch(setHoveredItem(item));
    };

    const mouseOutHandler = () => {
      dispatch(clearHoveredItem());
    };

    const onClickHandler = () => {
      dispatch(setModalItem(item));
      dispatch(openModal());
    };
    
  
    return (
      <div
        className={styles.item}
        style={wrapperStyle}
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
        onClick={onClickHandler}
      >
        <Image
          className={styles.img}
          src={item.icon.url}
          alt={item.name.en}
          width={iconWidth}
          height={iconHeight}
        />
      </div>
    );
  }

  return renderContent()
}
