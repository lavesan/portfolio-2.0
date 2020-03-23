export const onlyNumberMask = value => {
    return value.replace(/\D/g, '');
}

export const cpfMask = value => {

    const onlyNumber = value.replace(/\D/g, "");
    const f = onlyNumber.slice(0, 11);
    let finalValue = "";
    for (let i = 0; i < f.length; i++) {
      if ([3, 6].includes(i)) {
        finalValue += `.${f[i]}`;
      } else if (i === 9) {
        finalValue += `-${f[i]}`;
      } else {
        finalValue += `${f[i]}`;
      }
    }
    return finalValue;

}

export const maxLengthMask = (value, length) => {
    return value.slice(0, length);
}

export const onlyCharactersMask = value => {
    return value.replace(/[^a-zA-Z\u00C0-\u00FF ]/g, "");
}

export const celphoneMask = value => {

  const onlyNumber = value.replace(/\D/g, "");
  const f = onlyNumber.slice(0, 11);
  let finalValue = "";
  for (let i = 0; i < f.length; i++) {
    if (i === 0) {
      finalValue += `(${f[i]}`;
    } else if (i === 2) {
      finalValue += `) ${f[i]}`;
    } else if (i === 7) {
      finalValue += `-${f[i]}`;
    } else {
      finalValue += `${f[i]}`;
    }
  }
  return finalValue;

}

export const telephoneMask = value => {

  const onlyNumber = value.replace(/\D/g, "");
    const f = onlyNumber.slice(0, 10);
    let finalValue = "";
    for (let i = 0; i < f.length; i++) {
      if (i === 0) {
        finalValue += `(${f[i]}`;
      } else if (i === 2) {
        finalValue += `) ${f[i]}`;
      } else if (i === 6) {
        finalValue += `-${f[i]}`;
      } else {
        finalValue += `${f[i]}`;
      }
    }
    return finalValue;

}

export const onlyNumberStringToThreeDigit = value => {
  let onlyNumberValue = String(value).replace(/\D/g, "").replace(/^[0]+/, "");
  if (onlyNumberValue) {
    while (onlyNumberValue.length < 4) {
      onlyNumberValue = `0${onlyNumberValue}`;
    }
    return onlyNumberValue.replace(/(\d{1,3})$/, ",$1");
  }
  return "0,000";
}
