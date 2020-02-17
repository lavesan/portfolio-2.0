import React, { useEffect, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
// import { useModali } from 'modali';

import { StyledHeader } from './header.styles';
import { SearchInputComponent } from '../input';
import { AsideIconComponent } from '../aside-icon';
import { NavLinkComponent } from './nav-link';
import logo from '../../public/static/imgs/zero-veneno-logo.jpeg';
import { CategoryService } from '../../services/category.service';
import { NavDropdownComponent } from '../../components/nav-dropdown';
import { AddressModal } from '../modal/address-modal';

const HeaderComponent = function() {

    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState();    

    const login = () => {

    }

    const openCart = () => {

    }

    const filterWithCategory = (data) => {

        console.log('cliquei na categoria: ', data);

    }

    const showAddress = () => {
        setShow(true);
    }

    const categoryService = new CategoryService();

    const reloadCategories = useCallback(
        async () => {

            const categoriesRes = await categoryService.getAll();

            setCategories(categoriesRes.data);

            // id
            // name
            // childrens

        }, [categoryService]
    )

    useEffect(() => {
        reloadCategories();
    }, []);

    return (
        <>
            <StyledHeader>
                <div className="header-info">
                    <div onClick={showAddress}>
                        <FontAwesomeIcon icon={faMapMarkerAlt}  /> Locais que entregamos
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faClock}  /> Horários de entrega
                    </div>
                </div>
                <div className="header-actions">
                    <aside className="header-acition-logo">
                        <img src={logo} alt="Logo zero veneno" />
                    </aside>
                    <div>
                        <SearchInputComponent />
                    </div>
                    <aside className="header-actions-aside">
                        <AsideIconComponent
                            icon={faUserCircle}
                            text="Login"
                            title="Efetuar o login"
                            onClick={login} />
                        <span className="header-actions-aside-divisor"></span>
                        <AsideIconComponent
                            icon={faShoppingCart}
                            text="Carrinho"
                            title="Abrir o carrinho"
                            onClick={openCart} />
                    </aside>
                </div>
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
            </StyledHeader>
        </>
    )

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(HeaderComponent);