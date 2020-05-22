import React from 'react';
import { motion } from 'framer-motion';

import { StyledProjectSection } from './project-section.styles';
import { ISection } from '../inicio.interfaces';
import { SlideShowComponent } from '../../../components/slide-show';
import projectsJSON from '../../../public/static/projects.json';
import frameworksJSON from '../../../public/static/frameworks.json';

export default ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition }: ISection) => {

    const initialStyle  = { scale: 0 };
    const biggerStyle   = { scale: 1 };
    const duration      = { duration: 0.5 };

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
