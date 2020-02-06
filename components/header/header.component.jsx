import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { StyledHeader } from './header.styles';
import logo from '../../public/static/imgs/zero-veneno-logo.jpeg';

export default function HeaderComponent() {

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
                <img src={logo} alt="Logo zero veneno" />
            </div>
            <nav className="header-nav">
                <Link href="/inicio">
                    <a href="">Início</a>
                </Link>
                <Link href="/sobre">
                    <a href="">Sobre nós</a>
                </Link>
            </nav>
        </StyledHeader>
    )

}