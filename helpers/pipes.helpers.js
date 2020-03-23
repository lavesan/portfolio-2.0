export const floatToOneDigit = value => {
    return value
        ? value.toFixed(1).replace('.', ',')
        : 0;
}
