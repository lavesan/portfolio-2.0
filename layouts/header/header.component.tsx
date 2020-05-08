import React from 'react';

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
                    onClick={() => goToSection('projetos')}>
                    Projetos
                </button>
                {/* <div className="nav-header--line"></div> */}
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('sobre-mim')}>
                    Sobre mim
                </button>
                {/* <div className="nav-header--line"></div> */}
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('contato')}>
                    Contato
                </button>
            </header>
            {children}
        </HeaderLayout>
    )

}
