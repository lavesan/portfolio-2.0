import React, { useState, useCallback, useRef } from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import ScrollTrigger from "react-scroll-trigger";
import { motion } from "framer-motion";

import { TagcloudComponent } from '../../components/tagcloud';
import { ProjectCardComponent } from '../../components/project-card';
import { StyledInicioPage, StyledUnderbarTitle } from './inicio.styles';
import { ContactCardComponent } from '../../components/contact-card';
import { goToSection } from '../../helpers/location.helpers';
import { BounceWordAnimation } from '../../components/bounce-word';
import { IShowSections } from './inicio.interfaces';
import { BlogSectionComponent } from './blog-section';
// @ts-ignore
import myImage from '../../public/static/imgs/foto-portfolio.jpeg';
import projectsJSON from '../../public/static/projects.json';
import languages from '../../public/static/languages.json';
import theme from '../../app/app.theme';

export default () => {

    const [titlesRef, setTitlesRef] = useState<any>({
        about: null,
        projects: null,
        blogs: null,
        contact: null,
    });
    const [showSection, setShowSection] = useState<IShowSections>({
        about: false,
        projects: false,
        blogs: false,
        contact: false,
    });

    const aboutSection              = useRef<HTMLTableSectionElement>(null);
    const name                      = Array.from('Valdery Paes');
    const service                   = Array.from('Desenvolvedor de sites/aplicativos');
    const role                      = Array.from('full-stack');

    const initialLeftStyle          = { opacity: 0, transform: 'translateX(-100px)' };
    const initialRightStyle         = { opacity: 0, transform: 'translateX(100px)' };
    const animationStyle            = { opacity: 1, transform: 'translateX(0px)' };
    const animationTransition       = { duration: 1.2 };

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

    const onScrollEnter = (name: string) => {
        setShowSection(f => ({
            ...f,
            [name]: true,
        }));
    }

    const onScrollExit = (name: string) => {
        setShowSection(f => ({
            ...f,
            [name]: false,
        }));
    }

    return (
        <StyledInicioPage>
            <section className="introduction-section black-bg" id="inicio">
                <div className="introduction-section--info">
                    <p className="introduction-section--info--name">
                        {name.map((word, index) =><BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}
                    </p>
                    <h1>{service.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}</h1>
                    <p>{role.map((word, index) => <BounceWordAnimation key={index} activateOnClick={true}>{word}</BounceWordAnimation>)}</p>
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
            <section className="white-bg" id="sobre-mim">
                <ScrollTrigger onEnter={() => onScrollEnter('projects')} onExit={() => onScrollExit('projects')}>
                    <div className="about-section">
                        <div className="titles-container">
                            <h2 ref={useCallback((node) => onRefChange(node, 'about'), [])}>Sobre mim</h2>
                            <StyledUnderbarTitle width={titlesRef.about ? titlesRef.about.offsetWidth : 0} />
                        </div>
                        <motion.div
                            initial={initialLeftStyle}
                            animate={showSection.projects ? animationStyle : initialLeftStyle}
                            transition={animationTransition}
                            className="about-section--info-container">
                            <div className="about-section--info-container--img-container">
                                <img src={myImage} alt="Minha foto" />
                            </div>
                            <div>
                                <h3 className="about-section--info-container--text-title"><b>Quem é esse cara?</b></h3>
                                <p>Algo ai</p>
                            </div>
                        </motion.div>
                        <motion.div                    
                            initial={initialRightStyle}
                            animate={showSection.projects ? animationStyle : initialRightStyle}
                            transition={animationTransition}
                            style={{ textAlign: 'center' }}>
                            <TagcloudComponent data={languages} />
                        </motion.div>
                    </div>
                </ScrollTrigger>
            </section>
            <hr />
            <section className="white-bg" id="projetos" ref={aboutSection}>
                <div className="titles-container">
                    <h2 ref={useCallback((node) => onRefChange(node, 'projects'), [])}>Projetos</h2>
                    <StyledUnderbarTitle width={titlesRef.projects ? titlesRef.projects.offsetWidth : 0} />
                </div>
                {projectsJSON.map(project => <ProjectCardComponent key={project.id} {...project} />)}
            </section>
            <hr />
            <section className="white-bg" id="blogs">
                <ScrollTrigger onEnter={() => onScrollEnter('blogs')} onExit={() => onScrollExit('blogs')}>
                    <div className="titles-container">
                        <h2 ref={useCallback((node) => onRefChange(node, 'blogs'), [])}>Blogs</h2>
                        <StyledUnderbarTitle width={titlesRef.blogs ? titlesRef.blogs.offsetWidth : 0} />
                    </div>
                    <BlogSectionComponent
                        triggerAnimation={showSection.blogs}
                        initialLeftStyle={initialLeftStyle}
                        initialRightStyle={initialRightStyle}
                        animationStyle={animationStyle}
                        animationTransition={animationTransition} />  
                </ScrollTrigger>
            </section>
            <section className="contact-section black-bg" id="contato">
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
