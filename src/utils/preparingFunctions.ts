import store from "@/redux/store";

export const cleanItemTags = (description: string) => {
    const re = /item:\[[^\]]+\]/gi;

    let result: string = description;
    const matches = [...description.matchAll(re)];
    matches.map(([keywordRe]) => {
        let replaceValue = keywordRe.slice(6, -1);
        result = result.replace(keywordRe, replaceValue);
    });
    return result;
};

export const createParagraphs = (description: string)=>{
    let result = description;
    
    result = result.replaceAll("\\r\\n\\r\\n", `</p><p>`);
    result = result.replaceAll("\\r\\n<br>\\r\\n", `</p><br><p>`);
    result = result.replaceAll("\\r\\n", `<br>`);
    result = "<p>" + result + "</p>";

    return result;
    
}

export const colorizeText = (description: string)=>{
    const re = /data-color=\"[^\"]+\"/gi

    let result: string = description;
    const matches = [...description.matchAll(re)]
    matches.map(([keywordRe]) => {
        const color = keywordRe.slice(12, -1);
        const replaceValue = `style="color: ${color}"`
        result = result.replaceAll(keywordRe, replaceValue);
    });

    return result;
}

export const replaceItemKeywords = (description: string) => {
    const state = store.getState()
    const items = state.items.value;
    console.log(items)

    const re = /item:\[[^\]]+\]/gi;
    let str = description;
    const matches = [...str.matchAll(re)];

    matches.map(([keywordRe]) => {
        const item = items.find(item => item.name.en === keywordRe.slice(6, -1))
        if(item){
            let replaceValue = `
                <span data-item="${item.name.en}">
                ${item.name.en}
                </span>`;
            str = str.replace(keywordRe, replaceValue);
        }

    });
    return str;
};
