export const onlyNumber = value => {
    return String(value).replace(/\D/g, '');
}

export const numberStringToFloatThreeDigit = value => {
    if (typeof value === 'number') {
        return Number(value.toFixed(3));
    }
    return value ? Number(value.replace(',', '.')) : 0;
}

export const unmaskDistrictName = value => {
    
    const [firstLetter, ...valor] = value;
    const firstLetterLower = firstLetter.toLowerCase();
    const parsedValue = `${firstLetterLower}${valor.join('')}`;

    return parsedValue.replace(/ ([A-Z])/g, '$1')

}
