import store from "@/redux/store";

export default function getItemByName(name: string){
    const state = store.getState()
    const items = [...state.items.items, ...state.items.trinkets];

    return items.find(item => item.name.en === name)
}