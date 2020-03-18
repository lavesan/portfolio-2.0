import React, { useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faUserCircle, faShoppingCart, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import Link from 'next/link';

import { StyledHeader } from './header.styles';
import { SearchInputComponent } from '../search-input';
import { AsideIconComponent } from '../aside-icon';
import { NavLinkComponent } from './nav-link';
import logo from '../../public/static/imgs/zero-veneno-logo.jpeg';
import { CategoryService } from '../../services/category.service';
import { NavDropdownComponent } from '../../components/nav-dropdown';
import theme from '../../app/app.theme';
import { toggleAddressModal } from '../../store/actions/modalActions';
import { setCategories } from '../../store/actions/categoryActions';
import { screenResize } from '../../store/actions/uiActions';
import { addProductFilter } from '../../store/actions/productActions';
import { ResponsiveSearchInputComponent } from '../responsive-search-input';
import { toggleResponsiveMenu } from '../../store/actions/responsiveActions';

const HeaderComponent = ({ dispatch, categories, products, screenWidth }) => {

    const toggleResposiveMenu = () => {
        dispatch(toggleResponsiveMenu());
    }

    const filterWithCategory = (category) => {
        dispatch(addProductFilter(category));
    }

    const categoryService = new CategoryService();

    const reloadCategories = useCallback(
        async () => {
            const categoriesRes = await categoryService.getAll();
            dispatch(setCategories(categoriesRes))
        }, []
    )

    useEffect(() => {
        reloadCategories();
    }, [reloadCategories]);

    useEffect(() => {
        dispatch(screenResize({
            width: window.innerWidth,
            height: window.innerHeight,
        }));
        window.addEventListener('resize', () => {
            dispatch(screenResize({
                width: window.innerWidth,
                height: window.innerHeight,
            }));
        });
    }, [])

    return (
        <>
            <StyledHeader>
                {screenWidth >= 700 &&
                    <div className="header-info">
                        <div className="header-info-actions" onClick={() => dispatch(toggleAddressModal())} title="Abrir modal com locais de entrega">
                            <FontAwesomeIcon icon={faMapMarkerAlt}  /> Locais que entregamos
                        </div>
                        <div className="header-info-actions" title="Abrir modal com horas de entrega disponíveis">
                            <FontAwesomeIcon icon={faClock}  /> Horários de entrega
                        </div>
                    </div>
                }
                <div className="header-actions">
                    <aside className="header-acition-logo">
                        <img src={logo} alt="Logo zero veneno" />
                    </aside>
                    {screenWidth >= 700
                        ? <>
                            <div>
                                <SearchInputComponent
                                    placeholder="Procurar produtos"
                                    button={{
                                        text: 'Buscar',
                                        color: theme.green.secondary,
                                        backgroundColor: '#fff',
                                        borderColor: theme.gray.primary,
                                        title: 'Buscar produtos',
                                    }}
                                    icon={faSearch} />
                            </div>
                            <aside className="header-actions-aside">
                                <Link href="/entrar">
                                    <AsideIconComponent
                                        icon={faUserCircle}
                                        text="Login"
                                        title="Efetuar o login" />
                                </Link>
                                <span className="header-actions-aside-divisor"></span>
                                <Link href="/carrinho">
                                    <AsideIconComponent
                                        icon={faShoppingCart}
                                        text="Carrinho"
                                        title="Abrir o carrinho"
                                        notificationQuantity={products.length} />
                                </Link>
                            </aside>
                        </>
                        : <>
                            <div></div>
                            <aside className="responsive-icon-menu-container">
                                <div className="responsive-icon-menu" onClick={toggleResposiveMenu}>
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                            </aside>
                        </>
                    }
                </div>
                {screenWidth > 750 &&
                    <nav className="header-nav">
                        <NavLinkComponent
                            href="/inicio"
                            text="Início" />
                        <NavLinkComponent
                            href="/sobre"
                            text="Sobre nós" />
                        {categories.map(({ name, childrens, ...body }, index) => 
                            <NavDropdownComponent
                                key={index}
                                onDropInfoWhenClicked={{ name, ...body }}
                                onClick={filterWithCategory}
                                label={name}
                                closeOnClick={true}
                                elements={childrens} />
                        )}
                    </nav>
                }
                {screenWidth <= 700 &&
                    <div className="responsive-search-container">
                        <ResponsiveSearchInputComponent type="text" placeholder="Pesquisar por produtos" />
                    </div>
                }
            </StyledHeader>
        </>
    )

}

const mapStateToProps = store => ({
    categories: store.categoryState.categories,
    products: store.cartState.products,
    screenWidth: store.uiState.screenWidth,
})

export default connect(mapStateToProps)(HeaderComponent);