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
                <div className="about-section-info">
                    <h3 className="about-section--info-container--text-title"><b>Quem sou eu?</b></h3>
                    <p>
                        Me chamo Valdery e tenho 28 anos. Sempre gostei de criar e isso me levou a desenhar e esculpir por hobby. Já na faculdade tive meu primeiro contato com
                        programação e me enchi de ânimo quando vi que teria a oportunidade de fazer algo que as pessoas utilizariam, entrando
                        de cabeça na área de desenvolvimento!<br />
                        Com minha experiência eu me sinto bem tranquilo para tirar qualquer sonho do papel e transformá-lo em um software.<br />
                        Bora conversar sobre e planejar para eu partir para ação e te entregar um produto de qualidade?<br />
                        A maioria dos projetos que faço são internos e não posso publicar, mas abaixo mostro alguns que já fiz e posso mostrar!
                    </p>
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
