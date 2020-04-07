import React, { useState } from 'react';
import { connect } from "react-redux";

import { StyledAddressModal } from './address-modal.styles';
import { SearchInputComponent } from '../../search-input';
import senderImage from '../../../public/static/imgs/caricatura-entregador.png';
import theme from '../../../app/app.theme';
import { ModalComponent } from '../';
import { toggleAddressModal } from '../../../store/actions/modalActions';
import { cepMask } from '../../../helpers/mask.helpers';
import { authInstance } from '../../../services/auth.service';
import { unmaskDistrictName } from '../../../helpers/unmask.helpers';
import { priceByDistrictOpts } from '../../../helpers/order.helpers';
import { removeDiacritics } from '../../../helpers/removespecialCharacter.helpers';

const AddressModal = ({ dispatch, openAddressModal }) => {

    const authService = authInstance.getInstance();

    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSucess] = useState({
        text: '',
        status: false,
    });

    const text1 = 'os nossos entregadores, se esforçam muito para levar suas compras.'
    const text2 = 'Mas, antes de iniciá-las, verifique se o seu endereço tem disponibilidade de entrega :)'

    const toggleModal = () => {
        dispatch(toggleAddressModal());
    }

    const setFieldValue = value => {
        setCep(value);
    }
    
    const searchCep = async e => {

        e.preventDefault();

        setLoading(true);
        await authService.findCep(cep.replace(/\D/g, ''))
            .then(({ data }) => {

                const formatedDistrict = unmaskDistrictName(removeDiacritics(data.bairro));

                if (priceByDistrictOpts.some(f => f.label == formatedDistrict)) {
                    console.log('alterou sim')
                    setSucess({
                        text: 'Não fazemos entregas neste endereço :(',
                        status: false,
                    })
                } else {
                    console.log('chegou aqui...')
                    setSucess({
                        text: 'Entregamos no seu endereço!',
                        status: true,
                    })
                }

            })
            .catch(err => {
                console.log('deu pau nisto', err)
            });
        setLoading(false);

    }

    return (
        <ModalComponent toggleModal={toggleModal} show={openAddressModal}>
            <StyledAddressModal>
                <img className="sender-image" src={senderImage} alt="Caricatura do entregador" />
                <p className="text-paragrah">
                    <span className="highlight-text-paragraph">Marcone e Felipe,</span> {text1}<br />
                    {text2}
                </p>
                <div className="find-cep-form">
                    <SearchInputComponent
                        maskOnChange={cepMask}
                        value={cep}
                        setFieldValue={setFieldValue}
                        onSubmit={searchCep}
                        loading={loading}
                        placeholder="Seu CEP"
                        button={{
                            text: 'Verificar',
                            color: '#fff',
                            backgroundColor: theme.green.primary,
                            borderColor: theme.green.primary,
                            title: 'Verificar o CEP',
                        }} />
                </div>
                {success.text && <p className={success.status ? 'feedback' : 'feedback error'}>{success.text}</p>}
            </StyledAddressModal>
        </ModalComponent>
    )

}

const mapStateToProps = store => ({
    openAddressModal: store.modalState.openAddressModal,
})

export default connect(mapStateToProps)(AddressModal);
