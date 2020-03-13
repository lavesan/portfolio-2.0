import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

import { TalToUsCompoent } from './talk-to-us';
import { StyledFooter } from './footer.styles';

export default () => {
    return (
        <StyledFooter>
            <section className="footer-info">
                <div>
                    <h3>Sobre nós</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta dolorum odio repudiandae dicta quis? Dolorum vero quis est. Odit doloribus ipsa temporibus et aliquam facilis tempora perferendis molestias velit in.</p>
                    <p>
                        <strong>Nossas redes sociais</strong>
                    </p>
                    <div className="social-media-container">
                        <p title="Instagram"><FontAwesomeIcon icon={faInstagram} /></p>
                        <p title="Facebook"><FontAwesomeIcon icon={faFacebook} /></p>
                    </div>
                </div>
                <div>
                    <h3>Política de privacidade</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia mollitia ducimus totam, animi, modi iusto numquam officia earum id eligendi blanditiis neque distinctio. Repellat quas eligendi, dolores omnis reprehenderit eum!</p>
                </div>
                <div>
                    <h3>Fale conosco</h3>
                    <div>
                        <TalToUsCompoent
                            icon={faPhoneAlt}
                            value="(81) 99999-9999"
                            title="Ligar" />
                    </div>
                    <div>
                        <TalToUsCompoent
                            icon={faEnvelope}
                            value="mail@gmail.com"
                            title="Enviar mensagem" />
                    </div>
                </div>
            </section>
            <section className="footer-cards">
                <p>Zero veneno</p>
                <div></div>
            </section>
        </StyledFooter>
    )
}