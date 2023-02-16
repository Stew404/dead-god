import { useSelector } from "react-redux";

export function getItemByName(name){
    const itemsData = useSelector((state) => state.itemsData.value);

    return itemsData.filter((item) => item.item_name == name)[0];
}