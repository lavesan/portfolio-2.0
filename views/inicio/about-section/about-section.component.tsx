import React from 'react';
import { motion } from 'framer-motion';

import { TagcloudComponent } from '../../../components/tagcloud';
import { StyledAboutSection } from './about-section.styles';
import { ISection } from '../inicio.interfaces';
import languages from '../../../public/static/languages.json';
// @ts-ignore
import myImage from '../../../public/static/imgs/foto-portfolio.jpeg';

export default ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition }: ISection) => {

    const fasterAnimationTransition = { duration: 0.7 };

    return (
        <StyledAboutSection>
            <motion.div
                initial={initialLeftStyle}
                animate={triggerAnimation ? animationStyle : initialLeftStyle}
                transition={fasterAnimationTransition}
                className="about-section--info-container">
                <div className="about-section--info-container--img-container">
                    <img src={myImage} alt="Minha foto" />
                </div>
                <div>
                    <h3 className="about-section--info-container--text-title"><b>Quem sou eu?</b></h3>
                    <p>Algo ai</p>
                </div>
            </motion.div>
            <motion.div                    
                initial={initialLeftStyle}
                animate={triggerAnimation ? animationStyle : initialLeftStyle}
                transition={animationTransition}
                style={{ textAlign: 'center' }}>
                <TagcloudComponent data={languages} />
            </motion.div>
        </StyledAboutSection>
    )

}
