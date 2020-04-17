import { removeDiacritics } from './removespecialCharacter.helpers';

export const priceByDistrict = {
    brasiliaTeimosa: 6,
    cabanga: 6,
    boaViagem: 6,
    pina: 6,
    setubal: 6,
    imbiribeira: 6,
    boaVista: 9,
    madalena: 9,
    ipsep: 9,
    derby: 9,
    gracas: 9,
    bairroDoRecife: 9,
    soledade: 9,
    paissandu: 9,
    ibura: 9,
    ilhaDoLeite: 9,
    ilhaDoRetiro: 9,
    saoJose: 9,
    jordaoDeRecife: 9,
    benfica: 9,
    espinheiro: 12,
    rosarinho: 12,
    areias: 12,
    encruzilhada: 12,
    afogados: 12,
    jardimSaoPaulo: 12,
    aflitos: 12,
    torre: 12,
    torroes: 12,
    torreao: 12,
    varzea: 12,
    bongi: 12,
    macaxeira: 12,
    novaDescoberta: 12,
    piedade: 12,
    candeias: 12,
    santaTereza: 12,
    bairroNovo: 12,
    hipodromo: 12,
    sanMartin: 12,
    cordeiro: 12,
    santoAmaro: 12,
    apipucos: 16,
    aguaFria: 16,
    arruda: 16,
    caxanga: 16,
    doisIrmaos: 16,
    cidadeUniversitaria: 16,
    parnamirim: 16,
    casaForte: 16,
    casaAmarela: 16,
    poco: 16,
    pocoDaPanela: 16,
    iputinga: 16,
    engenhoDoMeio: 16,
    portoDaMadeira: 16,
    peixinhos: 16,
    tamarineira: 16,
    tejipio: 16,
    prazeres: 16,
}

export const priceByDistrictOpts = (() => {

    const entries = Object.entries(priceByDistrict);

    return entries.map(([key, value]) => {

        const [char, ...resto] = key;
        const novaString = `${char.toUpperCase()}${resto.join('')}`;

        const formatedWithSpaceAhead = novaString.replace(/([A-Z])/g, ' $1');

        return {
            label: formatedWithSpaceAhead.replace(/ /, ''),
            value: value,
        }

    })

})();

export const districtOpts = (() => {

    const entries = Object.entries(priceByDistrict);

    return entries.map(([key, value]) => {

        const [char, ...resto] = key;
        const novaString = `${char.toUpperCase()}${resto.join('')}`;

        const formatedWithSpaceAhead = novaString.replace(/([A-Z])/g, ' $1');

        return {
            label: formatedWithSpaceAhead.replace(/ /, ''),
            value: formatedWithSpaceAhead.replace(/ /, ''),
        }

    })

})();

export const paymentMethodOpts = [
    { label: 'Vou sim', value: 1 },
    { label: 'Não, pagarei em espécie', value: 0 },
]

export const districtNotValid = district => {

    const formatedDistrict = removeDiacritics(district);

    return !priceByDistrictOpts.some(opt => opt.label === formatedDistrict);

}

export const sendBackendDistrict = district => {

    const formatedDistrict = removeDiacritics(district);

    return formatedDistrict.replace(/^([A-Z])/, found => found.toLowerCase()).replace(/ /g, '');

}

export const lowerCaseDistrictOpts = (() => {

    const mappedValues = districtOpts.map(opt => ({
            ...opt,
            value: sendBackendDistrict(opt.value),
        })
    )
    return mappedValues;

})()

export const Brand = {
    mastercard: 'Mastercard',
    visa: 'Visa',
    visaElectron: 'Visaelectron',
    americanExpress: 'Amex',
    elo: 'Elo',
    hipercard: 'Hipercard',
    alelo: 'Alelo',
    sodexo: 'Sodexo',
}

export const brandOpts = [
    { label: 'Visa', value: Brand.visa },
    { label: 'Visa Electron', value: Brand.visaElectron },
    { label: 'Mastercard', value: Brand.mastercard },
    { label: 'American Express', value: Brand.americanExpress },
    { label: 'Hipercard', value: Brand.hipercard },
    { label: 'Elo', value: Brand.elo },
    { label: 'Alelo', value: Brand.alelo },
    { label: 'Sodexo', value: Brand.sodexo },
]

const OrderStatus = {
    TO_FINISH: 0,
    MADE: 1,
    PREPARING: 2,
    SENDING: 3,
    SENDED: 4,
    CANCELED: 5,   
}

const translatedStatus = {
    [OrderStatus.TO_FINISH]: 'A confirmar',
    [OrderStatus.MADE]: 'Iniciada',
    [OrderStatus.PREPARING]: 'Preparando',
    [OrderStatus.SENDING]: 'A caminho',
    [OrderStatus.SENDED]: 'Entregue',
    [OrderStatus.CANCELED]: 'Cancelada',
}

export const translateOrderStatus = status => {
    return translatedStatus[status];
}

const OrderMethod = {
    MONEY: 0,
    CREDIT: 1,
    DEBIT: 2,
}

const translateMethod = {
    [OrderMethod.MONEY]: 'dinheiro',
    [OrderMethod.CREDIT]: 'crédito',
    [OrderMethod.DEBIT]: 'débito',
}

export const translateOrderMethod = method => {
    return translateMethod[method];
}
