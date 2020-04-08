import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

import { StyledPerfilPage } from './perfil.styles';
import { FormFieldComponent } from '../../components/form/form-field';
import { FormOrderSelectComponent } from '../../components/form/form-order-select';
import { SucessButtonComponent } from '../../components/button';
import { authInstance } from '../../services/auth.service';
import { isRequired, validateCpf, validateEmail, isCellphoneNumber, validateOnlyNumber, validateOnlyCharacter, validateCep } from '../../helpers/validations.helpers';
import { cpfMask, maxLengthMask, onlyCharactersMask, celphoneMask, onlyNumberMask, cepMask } from '../../helpers/mask.helpers';
import { userRoleOpts, userGenderOpts } from '../../helpers/register.helpers';
import { lowerCaseDistrictOpts } from '../../helpers/order.helpers';
import { setUserInfo, clearUserInfo } from '../../store/actions/authActions';
import { clearSelectedOrder, setActiveOrders } from '../../store/actions/orderActions';

const PerfilPage = ({ dispatch, userInfo }) => {

    const authService = authInstance.getInstance();

    const router = useRouter();

    const { addToast } = useToasts();

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [internalInfo, setInternalInfo] = useState({});
    const [formValidations, setFormValidations] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const toogleEdit = () => {
        setCanEdit(f => !f);
    }

    const onCancel = () => {
        toogleEdit();
        setInternalInfo(userInfo);
    }

    const setFieldValue = (name, value) => {
        setInternalInfo(f => ({
            ...f,
            [name]: value,
        }));
    }
    
    const ageMask = value => {
        const onlyNumber = onlyNumberMask(value);
        return maxLengthMask(onlyNumber, 3);
    }

    const allocateUserInfoOnValues = () => {

        const contact = userInfo.contacts[0];
        const phone = contact
            ? `(${contact.ddd}) ${contact.number.match(/^\d{5}/)}-${contact.number.match(/\d{4}$/)}`
            : '';

        const contactId = contact ? contact.id : '';

        const address = userInfo.addresses[0];
        const addressData = address
            ? {
                addressId: address.id,
                address: address.address,
                cep: address.cep,
                number: address.number,
                complement: address.complement,
                type: address.type,
                district: '',
            }
            : {};
        
        if (address) {

            const foundDistrictOpt = lowerCaseDistrictOpts.find(opt => opt.value === address.district);
    
            if (foundDistrictOpt) {
                addressData.district = foundDistrictOpt;
            }

        }

        const foundGender = userGenderOpts.find(opt => opt.value === userInfo.gender);
        const foundRole = userRoleOpts.find(opt => opt.value === userInfo.role);

        setInternalInfo({
            phone,
            contactId,
            name: userInfo.name,
            email: userInfo.email,
            animalsQuantity: userInfo.animalsQuantity,
            childrensQuantity: userInfo.childrensQuantity,
            age: userInfo.age,
            description: userInfo.description,
            cpf: userInfo.cpf ? userInfo.cpf : userInfo.legalDocument,
            gender: foundGender ? foundGender : {},
            role: foundRole ? foundRole : {},
            ...addressData,
            cards: userInfo.cards.map(card => ({ ...card, actived: true })),
        })

    }

    const removeCard = card => {

        setInternalInfo(f => ({
            ...f,
            cards: f.cards.map(car => {

                if (car.id === card.id) {
                    return {
                        ...car,
                        actived: false,
                    }
                }

                return car;

            })
        }))

    }

    const validateFields = () => new Promise((resolve, reject) => {

        setSubmitted(true);
        const values = Object.values(formValidations);
        if (values.some(value => value && value.invalid)) {
            reject();
        }
        resolve();

    })

    const onSubmit = async e => {

        e.preventDefault();

        await validateFields();

        const contact = {
            id: '',
            ddd: '',
            number: '',
        }

        if (internalInfo.phone) {

            const onlyNumber = internalInfo.phone.replace(/\D/g, '');

            contact.ddd = onlyNumber.match(/^\d{2}/)[0];
            contact.number = onlyNumber.match(/\d{9}$/)[0];
            contact.id = internalInfo.contactId;

        }

        const address = {
            id: internalInfo.addressId,
            address: internalInfo.address,
            cep: internalInfo.cep,
            number: internalInfo.number,
            complement: internalInfo.complement,
            type: internalInfo.type,
            district: internalInfo.district ? internalInfo.district.value : '',
        }

        const body = {
            name: internalInfo.name,
            email: internalInfo.email,
            animalsQuantity: internalInfo.animalsQuantity,
            childrensQuantity: internalInfo.childrensQuantity,
            description: internalInfo.description,
            age: internalInfo.age,
            legalDocument: internalInfo.cpf,
            gender: internalInfo.gender.value,
            role: internalInfo.role.value,
            contact,
            address,
            cards: internalInfo.cards,
        }

        setLoading(true);
        await authService.updateUser(body)
            .then(res => {
                dispatch(setUserInfo(res));
                toogleEdit();
            })
            .catch(({ message }) => {
                showToast(message);
            });
        setLoading(false);

    }

    const logoff = () => {
        authService.logoff()
            .then(res => {
                dispatch(clearUserInfo());
                dispatch(setActiveOrders([]));
                dispatch(clearSelectedOrder());
                router.push('/inicio');
            })
            .catch(err => {
                dispatch(clearUserInfo());
                dispatch(setActiveOrders([]));
                dispatch(clearSelectedOrder());
                router.push('/inicio');
                console.log('erro: ', err);
            })
    }

    useEffect(() => {
        allocateUserInfoOnValues();
    }, [userInfo])

    useEffect(() => {
        allocateUserInfoOnValues();
    }, [canEdit])

    return (
        <StyledPerfilPage>
            <div className="title-container">
                <h1>Informações pessoais</h1>
                {!canEdit &&
                    <div>
                        <button
                            onClick={toogleEdit}
                            className="edit-button">
                                <FontAwesomeIcon className="pen-icon" icon={faPen} /> Editar
                        </button>
                    </div>
                }
                <div className="logoff-button-container">
                    <button type="button" className="logoff-button" onClick={logoff}><FontAwesomeIcon icon={faPowerOff} /> Sair</button>
                </div>
            </div>
            <form onSubmit={onSubmit} className="perfil-form">
                <div>
                    <FormFieldComponent
                        label="Nome"
                        name="name"
                        value={internalInfo.name}
                        setFieldValue={setFieldValue}
                        maskOnChange={onlyCharactersMask}
                        validatesOnChange={[isRequired, validateOnlyCharacter]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.name}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    <FormFieldComponent
                        label="Telefone"
                        name="phone"
                        value={internalInfo.phone}
                        setFieldValue={setFieldValue}
                        maskOnChange={celphoneMask}
                        validatesOnChange={[isRequired, isCellphoneNumber]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.name}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    <FormFieldComponent
                        label="E-mail"
                        name="email"
                        value={internalInfo.email}
                        setFieldValue={setFieldValue}
                        validatesOnChange={[isRequired, validateEmail]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.name}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    {internalInfo.cards && internalInfo.cards.length
                        ? <>
                            <p className="title-paragraph">Método de pagamento</p>
                            {internalInfo.cards.map(card =>
                                <>
                                    {card.actived &&
                                        <p className="card-button">
                                            {`Cartão de crédito ${card.lastDigits}`}
                                            <FontAwesomeIcon
                                                className="remove-icon"
                                                icon={faTimes}
                                                onClick={() => removeCard(card)} />
                                        </p>
                                    }
                                </>
                            )}
                        </>
                        : ''
                    }
                </div>
                <div>
                    <FormFieldComponent
                        label="Documento"
                        name="cpf"
                        value={internalInfo.cpf}
                        setFieldValue={setFieldValue}
                        maskOnChange={cpfMask}
                        validatesOnChange={[isRequired, validateCpf]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.cpf}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    <div className="row">
                        <FormOrderSelectComponent
                            label="Gênero"
                            name="gender"
                            value={internalInfo.gender}
                            setFieldValue={setFieldValue}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.gender}
                            options={userGenderOpts}
                            startValidations={submitted}
                            disabled={!canEdit} />
                        <FormFieldComponent
                            label="Idade"
                            name="age"
                            value={internalInfo.age}
                            setFieldValue={setFieldValue}
                            maskOnChange={ageMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.age}
                            startValidations={submitted}
                            disabled={!canEdit} />
                    </div>
                    <div className="row">
                        <FormFieldComponent
                            label="Quant. de animais"
                            name="animalsQuantity"
                            value={internalInfo.animalsQuantity}
                            setFieldValue={setFieldValue}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.animalsQuantity}
                            startValidations={submitted}
                            disabled={!canEdit} />
                        <FormFieldComponent
                            label="Quant. de crianças"
                            name="childrensQuantity"
                            value={internalInfo.childrensQuantity}
                            setFieldValue={setFieldValue}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.childrensQuantity}
                            startValidations={submitted}
                            disabled={!canEdit} />
                    </div>
                    <FormOrderSelectComponent
                        label="Seu papel"
                        name="role"
                        value={internalInfo.role}
                        setFieldValue={setFieldValue}
                        validatesOnChange={[isRequired]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.role}
                        options={userRoleOpts}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    <FormFieldComponent
                        label="Bio"
                        name="description"
                        value={internalInfo.description}
                        setFieldValue={setFieldValue}
                        disabled={!canEdit} />
                </div>
                <div>
                    <FormFieldComponent
                        label="CEP"
                        name="cep"
                        value={internalInfo.cep}
                        maskOnChange={cepMask}
                        validatesOnChange={[isRequired, validateCep]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.cep}
                        setFieldValue={setFieldValue}
                        startValidations={submitted}
                        disabled={!canEdit} />
                    <div className="address-1-row">
                        <FormFieldComponent
                            label="Endereço"
                            name="address"
                            value={internalInfo.address}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.address}
                            setFieldValue={setFieldValue}
                            startValidations={submitted}
                            disabled={!canEdit} />
                        <FormFieldComponent
                            label="Número"
                            name="number"
                            value={internalInfo.number}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.number}
                            setFieldValue={setFieldValue}
                            startValidations={submitted}
                            disabled={!canEdit} />
                    </div>
                    <div className="row">
                        <FormOrderSelectComponent
                            label="Bairro"
                            name="district"
                            value={internalInfo.district}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.district}
                            setFieldValue={setFieldValue}
                            startValidations={submitted}
                            options={lowerCaseDistrictOpts}
                            disabled={!canEdit} />
                        <FormFieldComponent
                            label="Favoritado como"
                            name="type"
                            value={internalInfo.type}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.type}
                            setFieldValue={setFieldValue}
                            startValidations={submitted}
                            disabled={!canEdit} />
                    </div>
                    <FormFieldComponent
                        label="Complemento"
                        name="complement"
                        value={internalInfo.complement}
                        setFieldValue={setFieldValue}
                        disabled={!canEdit} />
                    {canEdit &&
                        <div className="buttons-container">
                            <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
                            <SucessButtonComponent type="submit" text="Salvar" loading={loading} />
                        </div>
                    }
                </div>
            </form>
        </StyledPerfilPage>
    )

}

const mapStateToProps = store => ({
    userInfo: store.authState.userInfo,
})

export default connect(mapStateToProps)(PerfilPage);
