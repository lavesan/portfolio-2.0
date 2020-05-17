import React, { useState, useCallback, useEffect, useRef } from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
// import { useViewportScroll, useTransform } from 'react-motion-ui-pack';

import { TagcloudComponent } from '../../components/tagcloud';
import { ProjectCardComponent } from '../../components/project-card';
import { StyledInicioPage, StyledUnderbarTitle } from './inicio.styles';
import { ContactCardComponent } from '../../components/contact-card';
import { goToSection } from '../../helpers/location.helpers';
// @ts-ignore
import myImage from '../../public/static/imgs/foto-portfolio.jpeg';
import projectsJSON from '../../public/static/projects.json';
import languages from '../../public/static/languages.json';
import theme from '../../app/app.theme';

export default () => {

    const [titlesRef, setTitlesRef] = useState<any>({
        about: null,
        projects: null,
        contact: null,
    })

    const aboutSection = useRef<HTMLTableSectionElement>(null);
    
    const onRefChange = useCallback((node, refName) => {
        // ref value changed to node
        setTitlesRef((f: any) => ({
            ...f,
            [refName]: node,
        })); // e.g. change ref state to trigger re-render
        if (!node) { 
            // node is null, if DOM node of ref had been unmounted before
        } else {
            // ref value exists
        }
    }, []);

    const isBottom = (el: any) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const trackScrolling = () => {

        if (aboutSection.current) {
            const isto = aboutSection.current.getBoundingClientRect().bottom <= (window.innerHeight * 2);
            console.log('isto: ', isto);
        }

    }

    const handleInit = () => {
        document.addEventListener('scroll', trackScrolling);
    }
      
    const componentWillUnmount = () => {
        document.removeEventListener('scroll', trackScrolling);
    }

    useEffect(() => {
        handleInit();
    }, [handleInit])

    return (
        <StyledInicioPage>
            <section className="introduction-section" id="inicio">
                <div className="introduction-section--info">
                    <p className="introduction-section--info--name">Valdery Paes</p>
                    <h1>Desenvolvedor de sites/aplicativos</h1>
                    <p>freelancer full-stack</p>
                    <div className="introduction-section--info--buttons-container">
                        <button
                            type="button"
                            className="submit-button"
                            onClick={() => goToSection('contato')}>
                            Me contacte
                        </button>
                        <button
                            type="button"
                            className="submit-button"
                            onClick={() => goToSection('projetos')}>
                            Meus projetos
                        </button>
                    </div>
                </div>
            </section>
            {/* <hr /> */}
            <section className="about-section" id="sobre-mim">
                <div className="titles-container">
                    <h2 ref={useCallback((node) => onRefChange(node, 'about'), [])}>Sobre mim</h2>
                    <StyledUnderbarTitle width={titlesRef.about ? titlesRef.about.offsetWidth : 0} />
                </div>
                <div className="about-section--info-container">
                    <div className="about-section--info-container--img-container">
                        <img src={myImage} alt="Minha foto" />
                    </div>
                    <p>Algo ai</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <TagcloudComponent data={languages} />
                </div>
            </section>
            {/* <hr /> */}
            <section id="projetos" ref={aboutSection}>
                <div className="titles-container">
                    <h2 ref={useCallback((node) => onRefChange(node, 'projects'), [])}>Projetos</h2>
                    <StyledUnderbarTitle width={titlesRef.projects ? titlesRef.projects.offsetWidth : 0} />
                </div>
                {projectsJSON.map(project => <ProjectCardComponent key={project.id} {...project} />)}
            </section>
            {/* <hr /> */}
            <section className="contact-section" id="contato">
                <div className="titles-container">
                    <h2 ref={useCallback((node) => onRefChange(node, 'contact'), [])}>Contato</h2>
                    <StyledUnderbarTitle width={titlesRef.contact ? titlesRef.contact.offsetWidth : 0} />
                </div>
                <p className="description">
                    Quer que eu faça um projeto seu ou me enviar alguma proposta?<br />
                    Utilize um dos contatos abaixo!
                </p>
                <div className="contact-container">
                    <ContactCardComponent
                        href="https://wa.me/5581985405144"
                        text="(81) 98540-5144"
                        icon={faWhatsapp}
                        backgroundColor={theme.brands.whatsapp}
                    />
                    <ContactCardComponent
                        href="https://t.me/valdery"
                        text="(81) 98540-5144"
                        icon={faTelegramPlane}
                        backgroundColor={theme.brands.telegram}
                    />
                    <ContactCardComponent
                        href="mailto:valdery.jur@gmail.com"
                        text="valdery.jur@gmail.com"
                        icon={faEnvelope}
                        backgroundColor={theme.brands.gmail}
                    />
                </div>
            </section>
        </StyledInicioPage>
    )

}
