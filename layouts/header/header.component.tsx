import React from 'react';

import { HeaderLayout } from './header.styles';
import { IHeaderLayout } from './header.interfaces';

export default ({ children }: IHeaderLayout) => {

    const goToSection = (sectionName: string): void => {

        const link = document.getElementById(sectionName);
        if (link) {
            link.click();
        }

    }

    return (
        <HeaderLayout>
            <header className="nav-header">
                <a
                    href="#"
                    className="nav-header--header-link"
                    onClick={() => goToSection('projetos')}>
                        Projetos
                </a>
            </header>
            {children}
        </HeaderLayout>
    )

}
