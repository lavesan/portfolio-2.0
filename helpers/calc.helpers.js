export const onlyNumberStringToFloatNumber = (numberString) => {
    return Number(numberString.replace(/(\d{2})$/, '.$1'));
}

export const floatNumberToOnlyNumberString = (floatNumber) => {
    return floatNumber.toFixed(2).toString().replace(/\D/, '');
}

export const numberStringToReal = (valueCents) => {
    return `R$ ${onlyNumberStringToFloatNumber(valueCents).toString().replace('.', ',')}`;
}

export const numberToReal = (floatNumber) => {
    return `R$ ${floatNumber.toFixed(2).toString().replace('.', ',')}`;
}
