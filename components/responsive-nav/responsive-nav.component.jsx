import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { toggleResponsiveMenu } from '../../store/actions/responsiveActions';
import { StyledResponsiveNav } from './responsive-nav.styles';

const ResponsiveNavComponent = ({ dispatch, showResponsiveMenu, categories, screenWidth }) => {

    const toggleMenu = () => {
        dispatch(toggleResponsiveMenu());
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

            return getAllCategories(categories);
        },
        [categories]
    )

    return (
        <StyledResponsiveNav showResponsiveMenu={showResponsiveMenu && screenWidth <= 750}>
            <aside className="exit-container">
                <FontAwesomeIcon icon={faTimes} onClick={toggleMenu} />
            </aside>
            <nav className="nav-container">
                <Link href="/inicio">
                    <a onClick={toggleMenu}>Início</a>
                </Link>
                {mapCategoriesToLinear.map(category => <p onClick={toggleMenu}>{category.name}</p>)}
                <Link href="/sobre">
                    <a onClick={toggleMenu}>Sobre nós</a>
                </Link>
            </nav>
            <aside className="loggin-container">
                <p>Login</p>
                <p>Cadastre-se</p>
            </aside>
        </StyledResponsiveNav>
    )

}

const mapStateToProps = store => ({
    showResponsiveMenu: store.responsiveState.showResponsiveMenu,
    categories: store.categoryState.categories,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(ResponsiveNavComponent);
