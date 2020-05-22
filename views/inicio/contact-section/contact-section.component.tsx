import React from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

import { StyledContactSection } from './contact-section.styles';
import { ISection } from '../inicio.interfaces';
import { ContactCardComponent } from '../../../components/contact-card';
import theme from '../../../app/app.theme';

export default ({ triggerAnimation, initialLeftStyle, initialRightStyle, animationStyle, animationTransition }: ISection) => {

    return (
        <StyledContactSection>
            <p className="description">
                Quer que eu faça um projeto seu ou me enviar alguma proposta?
            </p>
            <p className="description second-description">Utilize um dos contatos abaixo!</p>
            <div className="contact-container">
                <ContactCardComponent
                    href="https://wa.me/5581985405144"
                    // text="(81) 98540-5144"
                    icon={faWhatsapp}
                    backgroundColor={theme.brands.whatsapp}
                />
                <ContactCardComponent
                    href="https://t.me/valdery"
                    // text="(81) 98540-5144"
                    icon={faTelegramPlane}
                    backgroundColor={theme.brands.telegram}
                />
                <ContactCardComponent
                    href="mailto:valdery.jur@gmail.com"
                    // text="valdery.jur@gmail.com"
                    icon={faEnvelope}
                    backgroundColor={theme.brands.gmail}
                />
            </div>
        </StyledContactSection>
    )

}
