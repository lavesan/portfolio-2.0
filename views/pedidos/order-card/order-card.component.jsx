import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { useRouter } from "next/router";
import { connect } from 'react-redux';

import { StyledOrderCard } from './order-card.styles';
import { productSuffixes } from '../../../helpers/product.helper';
import { numberStringToReal } from '../../../helpers/calc.helpers';
import { translateOrderStatus } from '../../../helpers/order.helpers';
import { SucessButtonComponent } from '../../../components/button';
import { setSelectedOrder } from '../../../store/actions/orderActions';
import { FormTextareaComponent } from '../../../components/form/form-textarea';
import { FormFieldComponent } from '../../../components/form/form-field';
import { StyledProductOrderCard } from '../../pedido/product-order-card';

const OrderCard = ({ dispatch, isResponsive, ...order }) => {

    const router = useRouter();

    const [showDetails, setShowDetails] = useState(false);

    const goToOrder = () => {
        dispatch(setSelectedOrder(order))
        if (isResponsive) {
            setShowDetails(true);
        } else {
            router.push('/pedido');
        }
    }

    const receiveDateTime = useMemo(
        () => {

            const momentDate = moment(order.receiveDate);

            return `${momentDate.format('DD/MM/YYYY')} às ${order.receiveTime}`;

        },
        [order]
    )
    
    const userName = useMemo(
        () => {
            return order.clientName || order.user ? order.user.name : '';
        },
        [order]
    )

    const productsWithCombos = useMemo(
        () => {

            const combosWithPreffix = order.combos.map(combo => ({
                ...combo,
                product: {
                    ...combo.combo,
                    quantitySuffix: '1x',
                },
            }))

            return order.products.concat(combosWithPreffix);
            
        },
        [order.combos, order.products]
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

    return (
        <StyledOrderCard>
            <div>
                <p><span className="labels">Pedido:</span> #{order.id}</p>
                <p><span className="labels">Status:</span> {translateOrderStatus(order.status)}</p>
            </div>
            <div>
                <p><span className="labels">Data da entrega:</span> {receiveDateTime}</p>
            </div>
            {showDetails
                ? <div className="order-details-container">
                    <h2 className="details-title">Informações do seu pedido</h2>
                    <div className="products-container">
                        {productsWithCombos.map(prodComb => <StyledProductOrderCard>{formatedQuantity(prodComb)}</StyledProductOrderCard>)}
                        <p className="total-value-text"><strong>TOTAL {order.payed ? 'PAGO' : 'A PAGAR'}: {numberStringToReal(order.totalValueCents)}</strong></p>
                    </div>
                    <FormFieldComponent
                        label={<b>Nome</b>}
                        value={userName}
                        className="text-field"
                        disabled={'true'} />
                    <FormFieldComponent
                        label={<b>Documento</b>}
                        value={order.cpf}
                        className="text-field"
                        disabled={'true'} />
                    <FormFieldComponent
                        label={<b>CEP</b>}
                        value={order.address.cep}
                        className="text-field"
                        disabled={'true'} />
                    <FormFieldComponent
                        label={<b>Bairro</b>}
                        value={order.address.district}
                        className="text-field"
                        disabled={'true'} />
                    <div className="row">
                        <FormFieldComponent
                            label={<b>Endereço</b>}
                            value={order.address.address}
                            className="text-field"
                            disabled={'true'} />
                        <FormFieldComponent
                            label={<b>Número</b>}
                            value={order.address.number}
                            className="text-field"
                            disabled={'true'} />
                    </div>
                    <FormFieldComponent
                        label={<b>Complemento</b>}
                        value={order.address.complement}
                        className="text-field"
                        disabled={'true'} />
                    <FormFieldComponent
                        label={<b>Horário e data de entrega</b>}
                        className="text-field"
                        value={receiveDateTime}
                        disabled={'true'} />
                    <FormTextareaComponent
                        label={<b>Comentário sobre o produto</b>}
                        value={order.description}
                        className="text-area-styled"
                        disabled={'true'} />
                    <h2 className="whatsapp-title">Quer falar com a equipe zero veneno?</h2>
                    <p className="whatsapp-paragraph">Fale conosco pelo Whatsapp</p>
                    <a
                        href="https://wa.me/5581994122409"
                        target="_blank"
                        className="go-to-whatsapp"
                        rel="noopener noreferrer">Ir para o Whatsapp</a>
                    <button
                        type="button"
                        className="close-visualization-action"
                        onClick={() => setShowDetails(false)}><b>Fechar visualização</b></button>
                </div>
                : <div className="last-container">
                    <p className="value-label">
                        TOTAL {order.payed ? 'PAGO' : 'A PAGAR'} {numberStringToReal(order.totalValueCents)}
                    </p>
                    <div>
                        <SucessButtonComponent
                            type="button"
                            text="Ver detalhes"
                            onClick={goToOrder} />
                    </div>
                </div>
            }
        </StyledOrderCard>
    )
    
}

export default connect()(OrderCard);
