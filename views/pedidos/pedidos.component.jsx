import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useToasts } from "react-toast-notifications";

import { StyledPedidosPage } from './pedidos.styles';
import { orderInstance } from '../../services/order.service';
import { setOrdersData } from '../../store/actions/orderActions';
import { OrderCardComponent } from './order-card';
import { FormTextareaComponent } from '../../components/form/form-textarea';
import { setCommentFormValidations, setCommentFormValue } from '../../store/actions/commentActions';
import { isRequired, minLength } from '../../helpers/validations.helpers';
import { SucessButtonComponent } from '../../components/button';
import { commentInstance } from '../../services/comment.service';

const PedidosPage = ({ activeOrders, ordersData, commentForm, commentValidations, userInfo, token, screenWidth, dispatch }) => {

    const orderService = orderInstance.getInstance();
    const commentService = commentInstance.getInstance();

    const { addToast } = useToasts();

    const [loadingComment, setLoadingComment] = useState(false);

    const showToast = message => {
        addToast(message, {
            appearance: "error",
            autoDismiss: true,
          })
    }

    const setFieldValue = (name, value) => {
        dispatch(setCommentFormValue(name, value));
    }
    
    const setFormValidations = (validation) => {
        dispatch(setCommentFormValidations(validation));
    }

    const validateMinLength = value => {
        return minLength(value, 10);
    }

    const saveComment = async () => {

        setLoadingComment(true);
        await commentService.saveComment({
                userId: userInfo.id,
                briefComment: commentForm.newComment,
        })
            .then(res => {
                addToast('Seu comentário foi salvo!', {
                    appearance: 'success',
                    autoDismiss: true,
                  });
            })
            .catch(err => {
                console.log('erro: ', err);
            })
        setLoadingComment(false);
    }

    const reloadOrders = useCallback(
        () => {

            let ordersIds = localStorage.getItem('orders');
            ordersIds = JSON.parse(ordersIds);

            if (ordersIds) {
                ordersIds = ordersIds.map(id => Number(id));
            } else {
                ordersIds = [];
            }

            orderService.findAllActiveByIds(ordersIds || activeOrders)
                .then(res => {

                    dispatch(setOrdersData(res));
                    const ordersId = res.map(order => order.id);
                    localStorage.setItem('orders', JSON.stringify(ordersId));

                })
                .catch(({ message }) => {
                    showToast(message);
                });

        },
        [activeOrders]
    )

    const isResponsive = useMemo(
        () => {
            return screenWidth < 750;
        },
        [screenWidth]
    )

    useEffect(() => {
        reloadOrders();
    }, [activeOrders])

    return (
        <StyledPedidosPage>
            <h2 className="title">Pedidos realizados</h2>
            {ordersData.length
                ? <div className="orders-container">
                    {ordersData.map(order => <OrderCardComponent key={order.id} isResponsive={isResponsive} {...order} />)}
                </div>
                : <p className="no-order-text">Não há pedidos ativos</p>
            }
            {token &&
                <div>
                    <h2 className="comment-title">Comentários sobre a compra no ecommerce?</h2>
                    <p className="comment-legend">Envie seu feedback sobre como foi a compra no ecommerce</p>
                    <FormTextareaComponent
                        name="newComment"
                        className="comment-texarea"
                        value={commentForm.newComment}
                        validatesOnChange={[isRequired, validateMinLength]}
                        setFormValidations={setFormValidations}
                        formValidation={commentValidations.newComment}
                        setFieldValue={setFieldValue} />
                    <div className="comment-button">
                        <SucessButtonComponent
                            type="button"
                            text="Enviar"
                            loading={loadingComment}
                            onClick={saveComment} />
                    </div>
                </div>
            }
        </StyledPedidosPage>
    )

}

const mapStateToProps = store => ({
    activeOrders: store.orderState.activeOrders,
    ordersData: store.orderState.ordersData,
    commentForm: store.commentState.commentForm,
    commentValidations: store.commentState.commentValidations,
    userInfo: store.authState.userInfo,
    token: store.authState.token,
    screenWidth: store.uiState.screenWidth,
});

export default connect(mapStateToProps)(PedidosPage);
