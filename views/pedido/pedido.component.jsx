import React, { useMemo, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import moment from 'moment';

import { StyledPedidoView } from './pedido.styles';
import { StyledProductOrderCard } from './product-order-card';
import { productSuffixes } from '../../helpers/product.helper';
import { translateOrderStatus } from '../../helpers/order.helpers';
import { numberStringToReal } from '../../helpers/calc.helpers';
import { FormFieldComponent } from '../../components/form/form-field';
import { FormTextareaComponent } from '../../components/form/form-textarea';
import { orderInstance } from '../../services/order.service';
import { setSelectedOrder } from '../../store/actions/orderActions';

const PedidoView = ({ selectedOrder = {}, activeOrders = [], dispatch, selectedOrderId }) => {

    const orderService = orderInstance.getInstance();

    const { addToast } = useToasts();

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true
          })
    }

    const zeroVenenoNumber = '(81) 99412-2409';

    const userName = useMemo(
        () => {
            return selectedOrder.userName || selectedOrder.user ? selectedOrder.user.name : '';
        },
        [selectedOrder]
    )

    const productsWithCombos = useMemo(
        () => {

            const combosWithPreffix = selectedOrder.combos.map(combo => ({
                ...combo,
                product: {
                    ...combo.combo,
                    quantitySuffix: '1x',
                },
            }))

            return selectedOrder.products.concat(combosWithPreffix);
            
        },
        [selectedOrder.combos, selectedOrder.products]
    )

    const receiveDateTime = useMemo(
        () => {

            const momentDate = moment(selectedOrder.receiveDate);

            return `${momentDate.format('DD/MM/YYYY')} às ${selectedOrder.receiveTime}`;

        },
        [selectedOrder]
    )

    const formatedQuantity = ({ quantity, product: { quantitySuffix } }) => {

        let formatedQuantity = quantity;
        let suffix = quantitySuffix.replace(/^\d*/g, '');

        if (quantitySuffix !== productSuffixes.UNITY) {
            formatedQuantity = quantity.toFixed(3).replace('.', ',');
            suffix = 'kg';
        }

        return `${formatedQuantity}${suffix}`;

    }

    const reloadOrder = useCallback(
        () => {
            
            const ordId = localStorage.getItem('selectedOrderId') || selectedOrderId;

            orderService.findAllActiveByIds([ordId])
                .then(res => {
                    if (!res.length) {
                        localStorage.removeItem('selectedOrderId')
                    } else {
                        dispatch(setSelectedOrder(res[0]));
                    }
                })
                .catch(({ message }) => {
                    showToast(message);
                });

        },
        [selectedOrderId]
    )

    useEffect(() => {
        reloadOrder();
    }, [reloadOrder])

    return (
        <StyledPedidoView>
            <h1 className="principal-title">Informações do seu pedido</h1>
            <p className="principal-paragraph">Produtos selecionados por você</p>
            <div className="product-value-container">
                <div className="products-flexbox">
                    {productsWithCombos.map(prodComb => <StyledProductOrderCard>{formatedQuantity(prodComb)} {prodComb.product.name}</StyledProductOrderCard>)}
                </div>
                <div className="divisor"></div>
                <div className="value-box">
                    <p><span className="status-label">Status:</span> {translateOrderStatus(selectedOrder.status)}</p>
                    <p className="total-value">TOTAL: {numberStringToReal(selectedOrder.totalValueCents)}</p>
                </div>
            </div>
            <div className="personal-info-container">
                <div>
                    <h2 className="section-title">Dados Pessoais</h2>
                    <FormFieldComponent
                        label="Nome"
                        value={userName}
                        disabled={'true'} />
                    <FormFieldComponent
                        label="Documento"
                        value={selectedOrder.cpf}
                        disabled={'true'} />
                </div>
                <div>
                    <h2 className="section-title">Endereço</h2>
                    <FormFieldComponent
                        label="CEP"
                        value={selectedOrder.address.cep}
                        disabled={'true'} />
                    <FormFieldComponent
                        label="Bairro"
                        value={selectedOrder.address.district}
                        disabled={'true'} />
                    <div className="row">
                        <FormFieldComponent
                            label="Endereço"
                            value={selectedOrder.address.address}
                            disabled={'true'} />
                        <FormFieldComponent
                            label="Número"
                            value={selectedOrder.address.number}
                            disabled={'true'} />
                    </div>
                    <FormFieldComponent
                        label="Complemento"
                        value={selectedOrder.address.complement}
                        disabled={'true'} />
                </div>
                <div>
                    <h2 className="section-title">Entrega e pagamento</h2>
                    <FormFieldComponent
                        label="Horário e data de entrega"
                        value={receiveDateTime}
                        disabled={'true'} />
                    <FormTextareaComponent
                        label="Comentário sobre o produto"
                        value={selectedOrder.description}
                        className="disabled-textarea"
                        disabled={'true'} />
                    <h2 className="contact-title">Quer falar com a equipe zero veneno?</h2>
                    <p className="contact-paragraph">Fale conosco pelo Whatsapp ou ligue pra gente.</p>
                    <p className="contact-paragraph">Nosso telefone {zeroVenenoNumber}</p>
                    <div className="link-container">
                        <a
                            href="https://wa.me/5581994122409"
                            target="_blank"
                            className="go-to-whatsapp"
                            rel="noopener noreferrer">Ir para o Whatsapp</a>
                    </div>
                </div>
            </div>
        </StyledPedidoView>
    )

}

const mapStateToProps = store => ({
    selectedOrder: store.orderState.selectedOrder,
    activeOrders: store.orderState.activeOrders,
    selectedOrderId: store.orderState.selectedOrderId,
})

export default connect(mapStateToProps)(PedidoView);
