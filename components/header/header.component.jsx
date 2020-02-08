import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";

import { StyledHeader } from './header.styles';
import { SearchInputComponent } from '../input';
import { AsideIconComponent } from '../aside-icon';
import { NavLinkComponent } from './nav-link';
import logo from '../../public/static/imgs/zero-veneno-logo.jpeg';

const HeaderComponent = function() {

    const login = () => {

    }

    const openCart = () => {

    }

    return (
        <StyledHeader>
            <div className="header-info">
                <div>
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
            </nav>
        </StyledHeader>
    )

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(HeaderComponent);