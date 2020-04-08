import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { StyledOrderSecondStepForm, StyledCardInfoRadio } from './order-second-step-form.styles';
import { FormFieldComponent } from '../../../../components/form/form-field';
import { StyledButtonFormEnd } from '../../../../components/form/form-button-field';
import { setCardStepValues, clearCardStepValues, setAllCardStepValues } from '../../../../store/actions/orderActions';
import { StyledSuccessButton } from '../../../../components/button';
import { StyledOrderFormTitle } from '../save-order-stepper.styles';
import { cpfMask, onlyNumberMask, cardValidThroughMask, cardNumberMask, maxLengthMask, onlyCharactersMask, integerMoneyMask } from '../../../../helpers/mask.helpers';
import { isRequired, validateCpf, isCardNumber, isValidThroughDate, maxLength, minLength } from '../../../../helpers/validations.helpers';
import { setCardValidation } from '../../../../store/actions/orderActions';
import { FormHorizontalCheckbox } from '../../../../components/form/form-horizontal-checkbox';
import { FormCheckboxComponent } from '../../../../components/form/form-checkbox';
import { FormRadioComponent, FormRadioComponentRow } from '../../../../components/form/form-radio';
import { paymentMethodOpts } from '../../../../helpers/order.helpers';
import { FormOrderSelectComponent } from '../../../../components/form/form-order-select';
import { brandOpts } from '../../../../helpers/order.helpers';

const OrderSecondStepForm = ({ dispatch, cardStep, cardValidations, token, userInfo, submitted }) => {

    const setFormValidations = (validation) => {
        dispatch(setCardValidation(validation));
    }

    const setFieldValue = (name, value) => {
        dispatch(setCardStepValues({ name, value }))
    }

    const chooseCard = (name, values) => {
        if (!values.value.id) {
            dispatch(clearCardStepValues());
        } else {
            dispatch(setAllCardStepValues(values.value));
        }
    }

    const cvvMask = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLengthMask(onlyNumber, 3);
    }

    const cvvValidation = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLength(onlyNumber, 3);
    }

    const minLength5 = value => {
        return minLength(value, 5);
    }

    const CardInfoRadio = ({ brand, lastDigits }) => {
        return (
            <StyledCardInfoRadio>
                <p className="card-title">{lastDigits}</p>
                <img src="https://www.mastercard.com.br/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt={brand} />
            </StyledCardInfoRadio>
        )
    }

    const allCardsSelect = useMemo(
        () => {

            const mappedCards = userInfo.cards.map(card => {
                return {
                    label: <CardInfoRadio {...card} />,
                    value: card,
                }
            });

            return [
                ...mappedCards,
                {
                    label: <p>Adicionar outro cartão</p>,
                    value: { id: '' },
                },
            ]

        },
        [userInfo]
    )

    useEffect(() => {
        if (!token) {
            setFieldValue('id', '');
        }
    }, [])

    useEffect(() => {
        if (userInfo.cards.length) {
            dispatch(setAllCardStepValues(userInfo.cards[0]));
        }
    }, []);

    return (
        <StyledOrderSecondStepForm>
            <StyledOrderFormTitle>Selecione o método de pagamento</StyledOrderFormTitle>
            <FormHorizontalCheckbox
                name="payLatter"
                setFieldValue={setFieldValue}
                selected={cardStep.payLatter}
                radios={[
                    // {
                    //     label: 'Cartão de crédito',
                    //     value: false,
                    // },
                    {
                        label: 'Pagar na entrega',
                        value: true,
                    },
                ]} />
            {!cardStep.payLatter
                ? <>
                    {userInfo.cards.length ?
                        <FormRadioComponent
                            value={cardStep.id}
                            setFieldValue={chooseCard}
                            radios={allCardsSelect}
                            selectedId={cardStep.id} /> : ''
                    }
                    {!cardStep.id &&
                        <>
                            <FormFieldComponent
                                label="CPF/CNPJ"
                                name="cpf"
                                setFormValidations={setFormValidations}
                                formValidation={cardValidations.cpf}
                                validatesOnChange={[isRequired, validateCpf]}
                                maskOnChange={cpfMask}
                                value={cardStep.cpf}
                                startValidations={submitted}
                                placeholder="Digite seu CPF"
                                setFieldValue={setFieldValue} />
                            <div className="first-row">
                                <FormFieldComponent
                                    label="Número do cartão"
                                    name="number"
                                    setFormValidations={setFormValidations}
                                    formValidation={cardValidations.number}
                                    maskOnChange={cardNumberMask}
                                    validatesOnChange={[isRequired, isCardNumber]}
                                    value={cardStep.number}
                                    startValidations={submitted}
                                    className="first-column"
                                    placeholder="0000 0000 0000 0000"
                                    setFieldValue={setFieldValue} />
                                <FormFieldComponent
                                    label="Vencimento"
                                    name="dueDate"
                                    setFormValidations={setFormValidations}
                                    formValidation={cardValidations.dueDate}
                                    maskOnChange={cardValidThroughMask}
                                    validatesOnChange={[isRequired, isValidThroughDate]}
                                    value={cardStep.dueDate}
                                    startValidations={submitted}
                                    className="second-column"
                                    placeholder="MM/AA"
                                    setFieldValue={setFieldValue} />
                            </div>
                            <div className="second-row">
                                <FormFieldComponent
                                    label="Nome completo"
                                    name="fullname"
                                    setFormValidations={setFormValidations}
                                    formValidation={cardValidations.fullname}
                                    validatesOnChange={[isRequired, minLength5]}
                                    maskOnChange={onlyCharactersMask}
                                    value={cardStep.fullname}
                                    startValidations={submitted}
                                    className="first-column"
                                    placeholder="Seu nome"
                                    setFieldValue={setFieldValue} />
                                <FormFieldComponent
                                    label="CVV"
                                    name="cvv"
                                    setFormValidations={setFormValidations}
                                    formValidation={cardValidations.cvv}
                                    validatesOnChange={[isRequired, cvvValidation]}
                                    maskOnChange={cvvMask}
                                    value={cardStep.cvv}
                                    className="second-column"
                                    startValidations={submitted}
                                    placeholder="000"
                                    setFieldValue={setFieldValue} />
                            </div>
                            <FormOrderSelectComponent
                                label="Bandeira"
                                name="brand"
                                placeholder="Escolha uma bandeira"
                                startValidations={submitted}
                                validatesOnChange={[isRequired]}
                                setFormValidations={setFormValidations}
                                formValidation={cardValidations.brand}
                                value={cardStep.brand}
                                setFieldValue={setFieldValue}
                                options={brandOpts} />
                            {token &&
                                <FormCheckboxComponent
                                    label={<label className="order-checkbox-label">Salvar como novo cartão</label>}
                                    name="saveCard"
                                    value={cardValidations.saveCard}
                                    onChange={setFieldValue} />
                            }
                        </>
                    }
                </>
                : <>
                    <FormFieldComponent
                        label="CPF/CNPJ"
                        name="cpf"
                        setFormValidations={setFormValidations}
                        formValidation={cardValidations.cpf}
                        validatesOnChange={[isRequired, validateCpf]}
                        maskOnChange={cpfMask}
                        value={cardStep.cpf}
                        placeholder="Digite seu CPF"
                        startValidations={submitted}
                        setFieldValue={setFieldValue} />
                    <label className="method-type-label" htmlFor="">Vai precisar de maquineta?</label>
                    <FormRadioComponentRow
                        value={cardStep.paymentType}
                        className="payment-method-radio"
                        name="paymentType"
                        startValidations={submitted}
                        setFieldValue={setFieldValue}
                        radios={paymentMethodOpts}
                        selected={cardStep.paymentType} />
                    <FormFieldComponent
                        label="Troco para quanto?"
                        name="changeValueCents"
                        disabled={cardStep.paymentType === 1 ? 'true' : ''}
                        startValidations={submitted}
                        maskOnChange={integerMoneyMask}
                        value={cardStep.changeValueCents}
                        placeholder="Informe o valor que quer trocar"
                        setFieldValue={setFieldValue} />
                </>
            }
        </StyledOrderSecondStepForm>
    )
}

const mapStateToProps = store => ({
    cardStep: store.orderState.cardStep,
    cardValidations: store.orderState.cardValidations,
    userInfo: store.authState.userInfo,
    token: store.authState.token,
})

export default connect(mapStateToProps)(OrderSecondStepForm);
