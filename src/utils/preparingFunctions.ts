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

