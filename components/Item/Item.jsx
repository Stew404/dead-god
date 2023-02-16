const React = require("react");

import { useDispatch } from "react-redux";
import {
  set as setHoveredItem,
  clear as clearHoveredItem,
} from "../../features/hoveredItem/hoveredItemSlice";
import { set as setSelectedItem } from "../../features/selectedItem/selectedItemSlice";
import { open } from "../../features/modal/modalSlice";

import Image from "next/image";
import styles from "./Item.module.scss";

export default function Item({ itemData }) {
  const dispatch = useDispatch();

  const iconWidth = itemData.icon_width;
  const iconHeight = itemData.icon_height;

  let wrapperStyle = {
    width: `${iconWidth}px`,
    height: `${iconHeight}px`,
  };

  let imgStyle = {
    imageRendering: "pixelated",
  };

  const mouseOverHandler = () => {
    dispatch(setHoveredItem(itemData));
  };

  const mouseOutHandler = () => {
    dispatch(clearHoveredItem());
  };

  const onClickHandler = () => {
    dispatch(setSelectedItem(itemData));
    dispatch(open());
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
        width={iconWidth}
        height={iconHeight}
        style={imgStyle}
        src={itemData.item_icon}
        alt=""
      />
    </div>
  );
}
