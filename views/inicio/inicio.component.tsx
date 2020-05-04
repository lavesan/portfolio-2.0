import React from 'react';

import { ProjectCardComponent } from '../../components/project-card';
import { StyledInicioPage } from './inicio.styles';
// @ts-ignore
import myImage from '../../public/static/imgs/foto-portfolio.jpeg';
import projectsJSON from '../../public/static/projects.json';

export default () => {

    return (
        <StyledInicioPage>
            <section className="introduction-section">
                <div className="introduction-section--img-container">
                    <img src={myImage} alt="Minha foto" />
                </div>
                <div className="introduction-section--info">
                    <p className="introduction-section--info--name">Valdery Paes</p>
                    <h1>Desenvolvedor de sites/aplicativos</h1>
                    <p>freelancer full-stack</p>
                </div>
            </section>
            <hr />
            <section>
                <h2 id="projetos">Projetos</h2>
                {projectsJSON.map(project => <ProjectCardComponent key={project.id} {...project} />)}
            </section>
            <hr />
            <section>
                <h2 id="sobre-mim">Sobre mim</h2>
            </section>
            <hr />
            <section>
                <h2 id="contato">Contato</h2>
            </section>
        </StyledInicioPage>
    )

}
