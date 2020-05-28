import React, { useState, useCallback } from 'react';
import ScrollTrigger from "react-scroll-trigger";

import { StyledInicioPage, StyledUnderbarTitle } from './inicio.styles';
import { IShowSections, ISectionReferences } from './inicio.interfaces';
import { BlogSectionComponent } from './blog-section';
import { AboutSectionComponent } from './about-section';
import { ProjectSectionComponent } from './project-section';
import { ContactSectionComponent } from './contact-section';
import { HomeSectionComponent } from './home-section';

export default () => {

    const [titlesRef, setTitlesRef] = useState<ISectionReferences>({
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
                <HomeSectionComponent />
            </section>
            <section className="white-bg" id="sobre-mim">
                <ScrollTrigger onEnter={() => onScrollEnter('about')} onExit={() => onScrollExit('about')}>
                    <div className="titles-container">
                        <h2 ref={useCallback((node) => onRefChange(node, 'about'), [])}>Sobre mim</h2>
                        <StyledUnderbarTitle width={titlesRef.about ? titlesRef.about.offsetWidth : 0} />
                    </div>
                    <AboutSectionComponent
                        triggerAnimation={showSection.about}
                        initialLeftStyle={initialLeftStyle}
                        initialRightStyle={initialRightStyle}
                        animationStyle={animationStyle}
                        animationTransition={animationTransition} />
                </ScrollTrigger>
            </section>
            <hr />
            <section className="white-bg" id="projetos">
                <ScrollTrigger onEnter={() => onScrollEnter('projects')} onExit={() => onScrollExit('projects')}>
                    <div className="titles-container">
                        <h2 ref={useCallback((node) => onRefChange(node, 'projects'), [])}>Projetos</h2>
                        <StyledUnderbarTitle width={titlesRef.projects ? titlesRef.projects.offsetWidth : 0} />
                    </div>
                    <ProjectSectionComponent
                        triggerAnimation={showSection.projects}
                        initialLeftStyle={initialLeftStyle}
                        initialRightStyle={initialRightStyle}
                        animationStyle={animationStyle}
                        animationTransition={animationTransition} />
                </ScrollTrigger>
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
            <section className="black-bg" id="contato">
                <ScrollTrigger onEnter={() => onScrollEnter('contact')} onExit={() => onScrollExit('contact')}>
                    <div className="titles-container">
                        <h2 ref={useCallback((node) => onRefChange(node, 'contact'), [])}>Contato</h2>
                        <StyledUnderbarTitle width={titlesRef.contact ? titlesRef.contact.offsetWidth : 0} />
                    </div>
                    <ContactSectionComponent
                        triggerAnimation={showSection.contact}
                        initialLeftStyle={initialLeftStyle}
                        initialRightStyle={initialRightStyle}
                        animationStyle={animationStyle}
                        animationTransition={animationTransition} />
                </ScrollTrigger>
            </section>
        </StyledInicioPage>
    )

}
