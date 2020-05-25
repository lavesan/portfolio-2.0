import React from 'react';
import { motion } from 'framer-motion';

import { StyledProjectSection } from './project-section.styles';
import { ISection } from '../inicio.interfaces';
import { SlideShowComponent } from '../../../components/slide-show';
import projectsJSON from '../../../public/static/projects.json';
import frameworksJSON from '../../../public/static/frameworks.json';

export default ({}: ISection) => {

    return (
        <StyledProjectSection>
            {/* <motion.div
                initial={initialStyle}
                animate={triggerAnimation ? biggerStyle : initialStyle}
                transition={duration}> */}
                <SlideShowComponent
                    projects={projectsJSON}
                    frameworks={frameworksJSON} />
            {/* </motion.div> */}
        </StyledProjectSection>
    )

}
