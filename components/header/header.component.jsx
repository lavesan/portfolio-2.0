import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faUserCircle, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import Link from 'next/link';
import { useRouter } from "next/router";

import { StyledHeader } from './header.styles';
import { SearchInputComponent } from '../search-input';
import { AsideIconComponent } from '../aside-icon';
import { NavLinkComponent } from './nav-link';
import { NavDropdownComponent } from '../../components/nav-dropdown';
import { toggleAddressModal } from '../../store/actions/modalActions';
import { addProductFilter, toogleProductFilter, setProductFilters, setInputSearchField } from '../../store/actions/productActions';
import { ResponsiveSearchInputComponent } from '../responsive-search-input';
import { ResponsiveMenuIcon } from './responsive-menu-icon';
import { FilterProductComponent } from './filter-products';
import logo from '../../public/static/imgs/zero-veneno-logo.jpeg';
import theme from '../../app/app.theme';

const HeaderComponent = ({ dispatch, categories, products, screenWidth, selectedFilters, inputField }) => {

    const router = useRouter();

    const filterWithCategory = category => {
        dispatch(setProductFilters({
            type: 'equals',
            field: 'cat.id',
            value: category.id,
        }));
        router.push('/produtos');
    }

    const toogleFilter = () => {
        dispatch(toogleProductFilter());
    }

    const filterData = (e) => {

        e.preventDefault();

        const values = Object.values(selectedFilters);

        const searchProducts = values.filter(filter => filter.active).map(({ active, ...body }) => body);

        searchProducts.push({
            id: 3,
            type: 'all',
            value: inputField,
            label: inputField,
        });

        dispatch(setProductFilters(searchProducts));

        router.push('/produtos');
        toogleFilter();

    }

    const changeFilterInput = (e) => {
        dispatch(setInputSearchField(e.target.value));
    }

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
                                    onSubmit={filterData}
                                    onClick={toogleFilter}
                                    setFieldValue={changeFilterInput}
                                    value={inputField}
                                    button={{
                                        text: 'Buscar',
                                        color: theme.green.secondary,
                                        backgroundColor: '#fff',
                                        borderColor: theme.gray.primary,
                                        title: 'Buscar produtos',
                                    }}
                                    icon={faSearch}>
                                    <FilterProductComponent />
                                </SearchInputComponent>
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
                            <ResponsiveMenuIcon />
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
                        <ResponsiveSearchInputComponent
                            type="text"
                            placeholder="Pesquisar por produtos"
                            onSubmit={filterData}
                            onClick={toogleFilter}
                            setFieldValue={changeFilterInput}
                            value={inputField}>
                            <FilterProductComponent className="responsive-input-filter" />
                        </ResponsiveSearchInputComponent>
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
    selectedFilters: store.productState.selectedFilters,
    inputField: store.productState.inputField,
})

export default connect(mapStateToProps)(HeaderComponent);