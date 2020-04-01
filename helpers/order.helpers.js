import { removeDiacritics } from './removespecialCharacter.helpers';

export const priceByDistrict = {
    boaViagem: 6,
    pina: 6,
    setubal: 6,
    afogados: 6,
    madalena: 6,
    boaVista: 6,
    ipsep: 6,
    imbiribeira: 6,
    arruda: 9,
    derby: 9,
    graças: 9,
    bairroDoRecife: 9,
    espinheiro: 9,
    rosarinho: 9,
    ibura: 9,
    caçote: 9,
    areias: 9,
    jordaoDeRecife: 9,
    bongi: 9,
    jardimSaoPaulo: 12,
    torre: 12,
    varzea: 12,
    caxanga: 12,
    macaxeira: 12,
    novaDescoberta: 12,
    casaAmarela: 12,
    doisIrmaos: 12,
    cajueiro: 12,
    piedade: 12,
    candeias: 12,
    santaTereza: 12,
    bairroNovo: 12,
    hipodromo: 12,
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

export const paymentMethodOpts = [
    { label: 'Vou sim', value: 1 },
    { label: 'Não, pagarei em espécie', value: 0 },
]

export const districtNotValid = district => {

    const formatedDistrict = removeDiacritics(district);

    return !priceByDistrictOpts.some(opt => opt.label === formatedDistrict);

}

export const Brand = {
    visa: 'visa',
    visaElectron: 'visaelectron',
    mastercard: 'mastercard',
    americanExpress: 'americanexpress',
    hipercard: 'hipercard',
    elo: 'elo',
    alelo: 'alelo',
    sodexo: 'sodexo',
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
