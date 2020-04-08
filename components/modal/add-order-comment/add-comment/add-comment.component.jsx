import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import moment from 'moment';

import { numberToReal, onlyNumberStringToFloatNumber } from '../../../../helpers/calc.helpers';
import { removeAllFirstDigits, unmaskDistrictName } from '../../../../helpers/unmask.helpers';
import { orderInstance } from '../../../../services/order.service';
import { SucessButtonComponent } from '../../../../components/button';
import { FormBlankTextarea } from '../../../../components/form/form-blank-textarea';
import { setCommentStepValues } from '../../../../store/actions/orderActions';
import { StyledAddOrderCommentModal } from '../add-order-comment.styles';
import { toogleOrderToFinishModal, setOrderData } from '../../../../store/actions/modalActions';
import { moveResponsiveStep, setOrderId } from '../../../../store/actions/orderActions';

const AddCommentCompoent = ({
    dispatch,
    products,
    scheduleStep,
    cardStep,
    addressStep,
    commentStep,
    token,
    toggleModal,
    orderId,
}) => {
    
    const orderService = orderInstance.getInstance();

    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const setFieldValue = (name, value) => {
        dispatch(setCommentStepValues({
            name,
            value,
        }));
    }

    const valueFromProduct = product => {

        const prodValue = product.promotionalValueCents
            ? onlyNumberStringToFloatNumber(product.promotionalValueCents) * product.quantity
            : onlyNumberStringToFloatNumber(product.actualValueCents) * product.quantity;

        return numberToReal(prodValue);

    }

    const onSubmit = async e => {
        
        e.preventDefault();

        setLoading(true);

        const deletedImgsProducts = products.map(product => {

            delete product.imgUrl;

            return product;

        })

        const combos = deletedImgsProducts.filter(product => product.isCombo);
        const onlyProducts = deletedImgsProducts.filter(product => !product.isCombo);

        const paymentMethod = cardStep.payLatter ? cardStep.paymentType : 1;
        const changeValuesFormated = cardStep.changeValueCents ? `${cardStep.changeValueCents.replace(/\D/g, '')}00` : '';
        const unmaskedDistrict = addressStep.district.label ? unmaskDistrictName(addressStep.district.label) : unmaskDistrictName(addressStep.district);
        const formatedDate = typeof scheduleStep.date === 'string' ? scheduleStep.date : moment(scheduleStep.date).format('DD/MM/YYYY');
        const formatedLegalDocument = cardStep.cpf.replace(/\D/g, '');

        let body = {
            type: paymentMethod,
            payed: cardStep.payLatter,
            description: cardStep.descriptions,
            description: commentStep.description,
            cpf: formatedLegalDocument,
            receive: {
                date: formatedDate,
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

        if (orderId) {
            body.id = orderId;
        }

        if (changeValuesFormated) {
            body.changeValueCents = changeValuesFormated;
        }

        if (!token) {

            const phoneOnlyNumber = addressStep.phoneNumber.replace(/\D/g, '');
            const ddd = phoneOnlyNumber.match(/^\d{2}/)[0];
            const number = phoneOnlyNumber.match(/\d{9}$/)[0];

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
                dispatch(setOrderId(res.order.id));
                if (toggleModal) {
                    toggleModal();
                    dispatch(toogleOrderToFinishModal(res));
                } else {
                    dispatch(setOrderData(res));
                    dispatch(moveResponsiveStep(true));
                }
            })
            .catch(({ message }) => {
                showToast(message);
            })

        setLoading(false);

    }

    return (
        <StyledAddOrderCommentModal onSubmit={onSubmit} isResponsive={!toggleModal}>
            {toggleModal &&
                <div className="title-container">
                    <h2>Adicionar comentário</h2>
                </div>
            }
            <div className="modal-body">
                <h3 className="products-title" style={{ marginBottom: 0 }}>Produtos</h3>
                {products.map(product =>
                    <div className="product-row">
                        <p><b>{product.quantity}{removeAllFirstDigits(product.quantitySuffix)} {product.name}</b></p>
                        <p className="product-row--price">{valueFromProduct(product)}</p>
                    </div>
                    )
                }
                <h3 className="products-title second-titles">Deseja adicionar um comentário sobre os produtos?</h3>
                <div className="product-description-textarea-container">
                    <FormBlankTextarea
                        legend="Ex.: abacates bem maduros"
                        name="description"
                        isOptional={true}
                        setFieldValue={setFieldValue}
                        value={commentStep.description} />
                </div>
                <div className="button-container">
                    <SucessButtonComponent
                        type="submit"
                        notDense={!toggleModal}
                        text="Prosseguir"
                        loading={loading} />
                </div>
            </div>
        </StyledAddOrderCommentModal>
    )

}

const mapStateToProps = store => ({
    products: store.cartState.products,
    scheduleStep: store.orderState.scheduleStep,
    cardStep: store.orderState.cardStep,
    orderId: store.orderState.orderId,
    addressStep: store.orderState.addressStep,
    token: store.authState.token,
    commentStep: store.orderState.commentStep,
})

export default connect(mapStateToProps)(AddCommentCompoent)
