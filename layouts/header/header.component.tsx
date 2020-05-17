import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope, faFolder, faUser } from '@fortawesome/free-regular-svg-icons';
// import { faEnvelope, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';

import { HeaderLayout } from './header.styles';
import { IHeaderLayout } from './header.interfaces';
import { goToSection } from '../../helpers/location.helpers';

export default ({ children }: IHeaderLayout) => {

    return (
        <HeaderLayout>
            <header className="nav-header">
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('inicio')}>
                    <FontAwesomeIcon icon={faHome} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Inicio</span>
                </button>
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('projetos')}>
                    <FontAwesomeIcon icon={faFolder} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Projetos</span>
                </button>
                {/* <div className="nav-header--line"></div> */}
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('sobre-mim')}>
                    <FontAwesomeIcon icon={faUser} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Sobre mim</span>
                </button>
                {/* <div className="nav-header--line"></div> */}
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('contato')}>
                    <FontAwesomeIcon icon={faEnvelope} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Contato</span>
                </button>
            </header>
            {children}
        </HeaderLayout>
    )

}
