import React from 'react';
import { useRouter } from "next/router";

import { SucessButtonComponent } from '../../../button';
import { StyledFinishedOrderModal } from '../finished-order-modal.styles';
import okIcon from '../../../../public/static/imgs/ok-icon.png';

export default ({ toggleModal }) => {

    const router = useRouter();

    const navigateToOrder = () => {
        router.push('/pedidos');
        if (toggleModal) {
            toggleModal();
        }
    }
    
    const goToHome = () => {
        router.push('/inicio');
    }

    return (
        <StyledFinishedOrderModal isResponsive={toggleModal}>
            <img src={okIcon} alt="Ícone de ordem finalizada"/>
            <p>Compra realizada com sucesso</p>
            {toggleModal
                ? ''
                : <a href="#" onClick={goToHome} className="return-link">Voltar a navegar</a>
            }
            <SucessButtonComponent
                type="button"
                notDense={'true'}
                text="Ver status do pedido"
                className="see-order-button"
                onClick={navigateToOrder} />
        </StyledFinishedOrderModal>
    )

}
