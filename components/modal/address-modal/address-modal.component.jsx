import React from 'react';

import { StyledAddressModal } from './address-modal.styles';
import senderImage from '../../../public/static/imgs/caricatura-entregador.png';

export default () => {

    const text1 = 'o nosso entregador, se esforça muito para levar suas compras.'
    const text2 = 'Mas, antes de iniciá-las, verifique se o seu endereço tem disponibilidade de entrega :)'

    return (
        <StyledAddressModal>
            <button type="button" className="close-button">FECHAR</button>
            <img className="sender-image" src={senderImage} alt="Caricatura do entregador" />
            <p className="text-paragrah">
                <span className="highlight-text-paragraph">Seu China,</span> {text1}<br />
                {text2}
            </p>
        </StyledAddressModal>
    )

}
