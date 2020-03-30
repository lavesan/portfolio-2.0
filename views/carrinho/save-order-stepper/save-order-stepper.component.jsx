import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { StyledSaveOrderForm } from './save-order-stepper.styles';
import { OrderAddressStepForm } from './order-address-step-form';
import { SchedulerStepFormComponent } from './scheduler-step-form';
import { OrderCardStepForm } from './order-second-step-form';
import { orderInstance } from '../../../services/order.service';
import { SucessButtonComponent } from '../../../components/button';
import { unmaskDistrictName } from '../../../helpers/unmask.helpers';
import { toogleOrderToFinishModal } from '../../../store/actions/modalActions';

const SaveOrderStepper = ({ className, scheduleStep, cardStep, addressStep, dispatch, products, addressValidations, scheduleValidations, cardValidations, token }) => {

    const orderService = orderInstance.getInstance();

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const formInvalid = () => {

        if (!products.length) {
            console.log('Sem produtos, obrigatório ter.')
            return true;
        }

        const cardStepValidate = cardStep.payLatter
            ? ['paymentType', 'legalDocument', 'paymentoMethod', 'changeValueCents']
            : ['paymentType', 'legalDocument', 'paymentoMethod', 'cvv', 'fullname', 'dueDate'];

        const cardStepInvalid = cardStepValidate.some(value => cardValidations[value] && cardValidations[value].invalid);

        const addressStepValidate = token
            ? ['id', 'cep', 'district', 'address', 'number', 'complement']
            : ['id', 'cep', 'district', 'address', 'number', 'complement', 'phoneNumber', 'userName'];

        if (token && !userInfo.contacts.length) {
            addressStepValidate.push('phoneNumber');
        }

        const addressStepInvalid = addressStepValidate.some(value => addressValidations[value] && addressValidations[value].invalid);

        const scheduleStepInvalid = Object.values(scheduleValidations).some(value => value.invalid);

        return cardStepInvalid || addressStepInvalid || scheduleStepInvalid;

    }

    const validateOrderForm = () => {
        return new Promise((resolve, reject) => {

            if (!submitted) {
                setSubmitted(true);
            }
    
            if (formInvalid()) {
                reject();
            }
            resolve();

        })
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        await validateOrderForm();

        setLoading(true);

        const combos = products.filter(product => product.isCombo);
        const onlyProducts = products.filter(product => !product.isCombo);

        const paymentMethod = cardStep.payLatter ? cardStep.paymentType : 1;
        const changeValuesFormated = cardStep.changeValueCents ? `${cardStep.changeValueCents.replace(/\D/g, '')}00` : '';
        const unmaskedDistrict = addressStep.district.label ? unmaskDistrictName(addressStep.district.label) : unmaskDistrictName(addressStep.district);

        let body = {
            type: paymentMethod,
            payed: cardStep.payLatter,
            description: cardStep.descriptions,
            changeValueCents: changeValuesFormated,
            receive: {
                date: moment(scheduleStep.date).format('DD/MM/YYYY'),
                time: scheduleStep.time,
            },
            saveAddress: addressStep.saveAddress,
            address: {
                id: addressStep.id,
                cep: addressStep.cep,
                district: unmaskedDistrict,
                address: addressStep.address,
                number: addressStep.number,
                complement: addressStep.complement,
            },
            products: onlyProducts,
            combos,
        };

        if (!token) {

            const phoneOnlyNumber = addressStep.phoneNumber.replace(/\D/g, '');
            const ddd = phoneOnlyNumber.match(/^\d{2}/);
            const number = phoneOnlyNumber.match(/\d{9}$/);

            body = {
                ...body,
                userName: addressStep.userName,
                contact: {
                    ddd,
                    number,
                    type: 0,
                }
            }

        }

        await orderService.save(body)
            .then(res => {
                console.log('chego aqui vei: ', res);
                dispatch(toogleOrderToFinishModal(res));
            })
            .catch(err => {
                console.log('erro: ', err);
            })

        setLoading(false);

    }

    return (
        <StyledSaveOrderForm className={className} onSubmit={onSubmit}>
            <OrderAddressStepForm submitted={submitted} />
            <SchedulerStepFormComponent submitted={submitted} />
            <OrderCardStepForm submitted={submitted} />
            <div className="action-button-row">
                <SucessButtonComponent
                    type="submit"
                    text="Confirmar dados"
                    loading={loading} />
            </div>
        </StyledSaveOrderForm>
    )
}

const mapStateToProps = store => ({
    scheduleStep: store.orderState.scheduleStep,
    cardStep: store.orderState.cardStep,
    addressStep: store.orderState.addressStep,
    scheduleValidations: store.orderState.scheduleValidations,
    addressValidations: store.orderState.addressValidations,
    cardValidations: store.orderState.cardValidations,
    userInfo: store.authState.userInfo,
    products: store.cartState.products,
    token: store.authState.token,
})

export default connect(mapStateToProps)(SaveOrderStepper);
