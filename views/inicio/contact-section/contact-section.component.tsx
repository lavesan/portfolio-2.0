import React from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

import { StyledContactSection } from './contact-section.styles';
import { ISection } from '../inicio.interfaces';
import { ContactCardComponent } from '../../../components/contact-card';
import theme from '../../../app/app.theme';

export default ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition }: ISection) => {

    const fasterTransition      = { duration: 0.5 };    
    const middleTransition      = { duration: 0.7 };    

    return (
        <StyledContactSection>
            <motion.div
                initial={initialLeftStyle}
                animate={triggerAnimation ? animationStyle : initialLeftStyle}
                transition={fasterTransition}>
                <p className="description">
                    Quer que eu faça um projeto seu ou me enviar alguma proposta?
                </p>
            </motion.div>
            <motion.div
                initial={initialLeftStyle}
                animate={triggerAnimation ? animationStyle : initialLeftStyle}
                transition={middleTransition}>
                <p className="description second-description">Me envie uma mensagem por email ou whatsapp clicando em um dos botões abaixo!</p>
            </motion.div>
            <motion.div
                initial={initialLeftStyle}
                animate={triggerAnimation ? animationStyle : initialLeftStyle}
                transition={animationTransition}>
                <div className="contact-container">
                    <ContactCardComponent
                        href="https://wa.me/5581985405144"
                        // text="(81) 98540-5144"
                        icon={faWhatsapp}
                        backgroundColor={theme.brands.whatsapp}
                    />
                    <ContactCardComponent
                        href="mailto:valdery.jur@gmail.com"
                        // text="valdery.jur@gmail.com"
                        icon={faEnvelope}
                        backgroundColor={theme.brands.gmail}
                    />
                </div>
            </motion.div>
        </StyledContactSection>
    )

}
