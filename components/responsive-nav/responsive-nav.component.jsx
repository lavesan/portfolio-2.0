import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import { toggleResponsiveMenu } from '../../store/actions/responsiveActions';
import { setSelectedForm } from '../../store/actions/authActions';
import { setProductFilters } from '../../store/actions/productActions';
import { StyledResponsiveNav } from './responsive-nav.styles';

const ResponsiveNavComponent = ({ dispatch, showResponsiveMenu, categories, screenWidth, activeOrders, token }) => {

    const router = useRouter();

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
                {token
                    ? <p onClick={() => goToPage('/perfil')}>Meu perfil</p>
                    : <>
                        <p onClick={navigateToLogin}>Login</p>
                        <p onClick={navigateToRegister}>Cadastre-se</p>
                    </>
                }
                {activeOrders && activeOrders.length
                    ? <a href="#" onClick={() => goToPage('/sobre')} className="orders-link">Ver meus pedidos</a>
                    : ''
                }
            </aside>
        </StyledResponsiveNav>
    )

}

const mapStateToProps = store => ({
    showResponsiveMenu: store.responsiveState.showResponsiveMenu,
    categories: store.categoryState.categories,
    screenWidth: store.uiState.screenWidth,
    activeOrders: store.orderState.activeOrders,
    token: store.authState.token,
})

export default connect(mapStateToProps)(ResponsiveNavComponent);
