import React, { useEffect, useRef, useState, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faFolder, faUser, faCommentDots, faChevronUp, faChevronDown, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

import { HeaderLayout } from './header.styles';
import { IChildren } from './header.interfaces';
import { goToSection } from '../../helpers/location.helpers';
import { IReduxStates } from '../../store/types';
import { SocialLinkComponent } from './social-link';

const mapStateToProps = (store: IReduxStates) => ({
    screenWidth: store.uiState.screenWidth,
});

const connector = connect(mapStateToProps);

const HeaderComponent = ({ children, screenWidth }: IChildren & ConnectedProps<typeof connector>) => {

    const [showFooter, setShowFotter]   = useState(false);
    const headerRef                     = useRef<HTMLHeadElement>(null);
    let teste                           = 0;
    const hideFooterStyle               = { bottom: '-80px' };
    const showFooterStyle               = { bottom: '-10px' };
    const transitionFooter              = { duration: 0.2 };

    const isResponsive = useMemo(
        () => {
            return screenWidth <= 850;
        },
        [screenWidth]
    )

    const reloadShowMenu = () => {

        if (isResponsive) {
            const currentScrollPos = window.pageYOffset;
            if (teste > currentScrollPos) {
                if (headerRef.current) {
                    headerRef.current.style.top = '-55px';
                }
            } else {
                if (headerRef.current) {
                    headerRef.current.style.top = '0';
                }
            }
            teste = currentScrollPos;
        } else {
            if (headerRef.current) {
                headerRef.current.style.top = '0';
            }
        }

    }

    const toogleFooter = () => {
        setShowFotter(f => !f);
    }

    useEffect(() => {

        window.onscroll = reloadShowMenu;

        // removes the event on destroy
        return () => {
            window.removeEventListener('onscroll', reloadShowMenu);
        }

    }, []);

    return (
        <HeaderLayout>
            <header className="nav-header" ref={headerRef}>
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
                    <SocialLinkComponent />
                </aside>
            </header>
            {children}
            {isResponsive && (
                <motion.footer
                    initial={hideFooterStyle}
                    animate={showFooter ? showFooterStyle : hideFooterStyle}
                    transition={transitionFooter}
                    className="footer-links">
                    {showFooter
                        ? <FontAwesomeIcon className="footer-links-toogle" onClick={toogleFooter} icon={faChevronDown} />
                        : <FontAwesomeIcon className="footer-links-toogle" onClick={toogleFooter} icon={faChevronUp} />
                    }
                    <SocialLinkComponent />
                </motion.footer>
            )}
        </HeaderLayout>
    )

}

export default connector(HeaderComponent);
