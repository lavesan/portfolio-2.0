import React, { useState, useEffect } from 'react';

import { StyledSlideShow } from './slide-show.styles';
import { ISlideShow, IProject } from './slide-show.interfaces';
import { ProjectCardComponent } from './project-card';

export default ({ projects, frameworks }: ISlideShow) => {

    const [selectedFramework, setSelectedFramework] = useState<string>(frameworks[0]);
    const [selectedProject, setSelectedProject]     = useState<any>({ id: 0 });
    const [projectsToDisplay, setProjectToDisplay]  = useState<IProject[]>([]);

    const onFrameworkClick = (framework: string) => {
        setSelectedFramework(framework);
    }

    const onProjectclick = (project: any) => {
        setSelectedProject(project);
    }

    const filterProjects = () => {

        const filteredProjects = projects.filter(project => project.tools.includes(selectedFramework));
        setProjectToDisplay(filteredProjects);

    }

    useEffect(() => {

        const projectsToHide = projectsToDisplay.some(project => !project.tools.includes(selectedFramework));

        // If there's projects to hide, shows the hide animation
        if (projectsToHide) {
            setProjectToDisplay(actualValue => {
                return actualValue.map(project =>
                    project.tools.includes(selectedFramework)
                        ? project
                        : { ...project, disappear: true }
                )
            });
            setTimeout(() => {
                filterProjects();
            }, 300);

        } else {
            // If There's no projects to hide, filters the projects ASAP
            filterProjects();
        }

    }, [selectedFramework]);

    return (
        <StyledSlideShow>
            <header className="slide-show-header">
                {frameworks.map((framework, index) => (
                    <React.Fragment key={framework}>
                        <button
                            onClick={() => onFrameworkClick(framework)}
                            className={`framework-button ${selectedFramework === framework && 'framework-button--selected'}`}>
                            {framework}
                        </button>
                        {index < frameworks.length - 1 &&
                        <   div className="slide-show-header--divisor" />
                        }
                    </React.Fragment>
                ))}
            </header>
            <div className="slide-show-projects">
                {projectsToDisplay.map(project => 
                    <ProjectCardComponent
                        key={project.id}
                        selected={selectedProject.id === project.id}
                        onTouchStart={() => onProjectclick(project)}
                        {...project} />)}
            </div>
        </StyledSlideShow>
    )

}
