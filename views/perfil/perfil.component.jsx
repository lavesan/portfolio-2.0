import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import { StyledPerfilPage } from './perfil.styles';
import { FormFieldComponent } from '../../components/form/form-field';
import { FormOrderSelectComponent } from '../../components/form/form-order-select';
import { SucessButtonComponent } from '../../components/button';
import { authInstance } from '../../services/auth.service';
import { isRequired, validateCpf, validateEmail, isCellphoneNumber, validateOnlyNumber, validateOnlyCharacter, validateCep } from '../../helpers/validations.helpers';
import { cpfMask, maxLengthMask, onlyCharactersMask, celphoneMask, onlyNumberMask, cepMask } from '../../helpers/mask.helpers';
import { userRoleOpts, userGenderOpts } from '../../helpers/register.helpers';
import { districtOpts } from '../../helpers/order.helpers';

const PerfilPage = ({ dispatch, userInfo }) => {

    const authService = authInstance.getInstance();

    const [canEdit, setCanEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [internalInfo, setInternalInfo] = useState(userInfo);
    const [formValidations, setFormValidations] = useState({});

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

    }

    const onSubmit = async e => {

        e.preventDefault();

        console.log('internalInfo: ', internalInfo);
        setLoading(true);
        // await authService.updateUser(internalInfo)
        //     .then(res => {
        //         console.log('res: ', res);
        //     })
        //     .catch(err => {
        //         console.log('erro: ', err);
        //     });
        setLoading(false);

    }

    useEffect(() => {
        console.log('internalInfo: ', userInfo);
        allocateUserInfoOnValues();
    }, [userInfo])

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
                        disabled={canEdit} />
                    <FormFieldComponent
                        label="Telefone"
                        name="phone"
                        value={internalInfo.phone}
                        setFieldValue={setFieldValue}
                        maskOnChange={celphoneMask}
                        validatesOnChange={[isRequired, isCellphoneNumber]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.name}
                        disabled={canEdit} />
                    <FormFieldComponent
                        label="E-mail"
                        name="email"
                        value={internalInfo.email}
                        setFieldValue={setFieldValue}
                        validatesOnChange={[isRequired, validateEmail]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.name}
                        disabled={canEdit} />
                    {internalInfo.cards && internalInfo.cards.length
                        ? <>
                            <p className="title-paragraph">Método de pagamento</p>
                            {internalInfo.cards.map(card =>
                                <button
                                    type="button"
                                    className="card-button">
                                        {`Cartão de crédito ${card.lastDigits}`}
                                        <FontAwesomeIcon className="remove-icon" icon={faTimes} />
                                    </button>
                                )
                            }
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
                        disabled={canEdit} />
                    <div className="row">
                        {/* <FormOrderSelectComponent
                            label="Gênero"
                            name="gender"
                            value={internalInfo.gender}
                            setFieldValue={setFieldValue}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.gender}
                            options={userGenderOpts}
                            disabled={canEdit} /> */}
                        <FormFieldComponent
                            label="Idade"
                            name="age"
                            value={internalInfo.age}
                            setFieldValue={setFieldValue}
                            maskOnChange={ageMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.age}
                            disabled={canEdit} />
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
                            disabled={canEdit} />
                        <FormFieldComponent
                            label="Quant. de crianças"
                            name="childrensQuantity"
                            value={internalInfo.childrensQuantity}
                            setFieldValue={setFieldValue}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.childrensQuantity}
                            disabled={canEdit} />
                    </div>
                    {/* <FormOrderSelectComponent
                        label="Seu papel"
                        name="role"
                        value={internalInfo.role}
                        setFieldValue={setFieldValue}
                        validatesOnChange={[isRequired]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.role}
                        userRoleOpts={userRoleOpts}
                        disabled={canEdit} /> */}
                    <FormFieldComponent
                        label="Bio"
                        name="description"
                        value={internalInfo.description}
                        setFieldValue={setFieldValue}
                        disabled={canEdit} />
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
                        disabled={canEdit} />
                    <div className="address-1-row">
                        <FormFieldComponent
                            label="Endereço"
                            name="address"
                            value={internalInfo.address}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.address}
                            setFieldValue={setFieldValue}
                            disabled={canEdit} />
                        <FormFieldComponent
                            label="Número"
                            name="number"
                            value={internalInfo.number}
                            maskOnChange={onlyNumberMask}
                            validatesOnChange={[isRequired, validateOnlyNumber]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.number}
                            setFieldValue={setFieldValue}
                            disabled={canEdit} />
                    </div>
                    <div className="row">
                        {/* <FormOrderSelectComponent
                            label="Bairro"
                            name="district"
                            value={internalInfo.district}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.district}
                            setFieldValue={setFieldValue}
                            options={districtOpts}
                            disabled={canEdit} /> */}
                        <FormFieldComponent
                            label="Favoritado como"
                            name="type"
                            value={internalInfo.type}
                            validatesOnChange={[isRequired]}
                            setFormValidations={setFormValidations}
                            formValidation={formValidations.type}
                            setFieldValue={setFieldValue}
                            disabled={canEdit} />
                    </div>
                    <FormFieldComponent
                        label="Complemento"
                        name="complement"
                        value={internalInfo.complement}
                        validatesOnChange={[isRequired]}
                        setFormValidations={setFormValidations}
                        formValidation={formValidations.complement}
                        setFieldValue={setFieldValue}
                        disabled={canEdit} />
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
