import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faFolder, faUser, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { HeaderLayout } from './header.styles';
import { IChildren } from './header.interfaces';
import { goToSection } from '../../helpers/location.helpers';

export default ({ children }: IChildren) => {

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
                    onClick={() => goToSection('sobre-mim')}>
                    <FontAwesomeIcon icon={faUser} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Sobre mim</span>
                </button>
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('projetos')}>
                    <FontAwesomeIcon icon={faFolder} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Projetos</span>
                </button>
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('blogs')}>
                    <FontAwesomeIcon icon={faCommentDots} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Blogs</span>
                </button>
                <button
                    type="button"
                    className="nav-header--header-link"
                    onClick={() => goToSection('contato')}>
                    <FontAwesomeIcon icon={faEnvelope} className="nav-header--header-link--icon" />
                    <span className="nav-header--header-link--text">Contato</span>
                </button>
                <aside className="nav-header--social-links-container">
                    <a
                        href="https://github.com/lavesan"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Github"
                        className="nav-header--social-links-container--github">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/valdery-alves-a32653160/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Linkedin"
                        className="nav-header--social-links-container--linkedin">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </aside>
            </header>
            {children}
        </HeaderLayout>
    )

}
