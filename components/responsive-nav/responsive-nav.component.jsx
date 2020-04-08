import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import { toggleResponsiveMenu } from '../../store/actions/responsiveActions';
import { setSelectedForm, clearUserInfo } from '../../store/actions/authActions';
import { setProductFilters } from '../../store/actions/productActions';
import { clearSelectedOrder, setOrdersData } from '../../store/actions/orderActions';
import { StyledResponsiveNav } from './responsive-nav.styles';
import { authInstance } from '../../services/auth.service';

const ResponsiveNavComponent = ({ dispatch, showResponsiveMenu, categories, screenWidth, ordersData, token }) => {

    const router = useRouter();

    const authService = authInstance.getInstance();

    const toggleMenu = () => {
        dispatch(toggleResponsiveMenu());
    }

    const goToProducts = category => {
        dispatch(setProductFilters(
            [
                {
                    type: 'equals',
                    field: 'cat.id',
                    value: category.id,
                    label: category.name,
                },
            ]
        ));
        goToPage('/produtos')
    }

    const goToPage = async (page) => {
        await router.push(page);
        toggleMenu();
    }

    const navigateToLogin = async () => {
        dispatch(setSelectedForm({
            selectedForm: 'login',
        }));
        goToPage('/entrar');
    }
    
    const navigateToRegister = async () => {
        dispatch(setSelectedForm({
            selectedForm: 'register',
        }));
        goToPage('/entrar');
    }

    const logoff = () => {

        authService.logoff()
            .then(res => {
                dispatch(clearUserInfo());
                dispatch(setOrdersData([]));
                dispatch(clearSelectedOrder());
                goToPage('/inicio')
            })
            .catch(err => {
                dispatch(clearUserInfo());
                dispatch(setOrdersData([]));
                dispatch(clearSelectedOrder());
                goToPage('/inicio')
            })

    }

    const mapCategoriesToLinear = useMemo(
        () => {

            const getAllCategories = ([category, ...categories]) => {

                if (!category) {
                    return [];
                }

                const childrens = category.childrens ? category.childrens : [];

                return [
                    category,
                    ...childrens,
                    ...getAllCategories(categories),
                ];

            }

            return getAllCategories(categories || []);
        },
        [categories]
    )

    return (
        <StyledResponsiveNav showResponsiveMenu={showResponsiveMenu && screenWidth <= 750}>
            <aside className="exit-container">
                <FontAwesomeIcon icon={faTimes} onClick={toggleMenu} />
            </aside>
            <nav className="nav-container">
                <a onClick={() => goToPage('/inicio')}>Início</a>
                {mapCategoriesToLinear.map(category => <p key={category.id} onClick={() => goToProducts(category)}>{category.name}</p>)}
                <a onClick={() => goToPage('/sobre')}>Sobre nós</a>
            </nav>
            <aside className="loggin-container">
                {ordersData && ordersData.length
                    ? <div className="orders-link-container">
                        <a href="#" onClick={() => goToPage('/pedidos')} className="orders-link">Ver meus pedidos</a>
                    </div>
                    : ''
                }
                {token
                    ? <>
                        <p onClick={() => goToPage('/perfil')}>Meu perfil</p>
                        <p onClick={logoff}>Sair</p>
                    </>
                    : <>
                        <p onClick={navigateToLogin}>Login</p>
                        <p onClick={navigateToRegister}>Cadastre-se</p>
                    </>
                }
            </aside>
        </StyledResponsiveNav>
    )

}

const mapStateToProps = store => ({
    showResponsiveMenu: store.responsiveState.showResponsiveMenu,
    categories: store.categoryState.categories,
    screenWidth: store.uiState.screenWidth,
    ordersData: store.orderState.ordersData,
    token: store.authState.token,
})

export default connect(mapStateToProps)(ResponsiveNavComponent);
